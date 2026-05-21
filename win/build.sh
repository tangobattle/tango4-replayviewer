#!/bin/bash
set -euo pipefail

# Under Git Bash on Windows, /usr/bin/link.exe (an MSYS coreutil, not
# the MSVC linker) precedes MSVC's link.exe on PATH and rustc ends up
# invoking the wrong one. Promote MSVC's bin dir (located via cl.exe,
# which msvc-dev-cmd has put on PATH) to the front.
if command -v cl.exe >/dev/null 2>&1; then
    msvc_bin=$(dirname "$(command -v cl.exe)")
    export PATH="$msvc_bin:$PATH"
fi

# openssl-src (pulled in by datachannel-sys's vendored feature) builds
# OpenSSL from source via OpenSSL's Configure perl script, which needs
# modules (Locale::Maketext::Simple, etc.) that Git Bash's minimal MSYS
# perl doesn't ship. Strawberry Perl (preinstalled on the windows-2022
# runner) has them; promote it to the front of PATH.
if [ -d "/c/Strawberry/perl/bin" ]; then
    export PATH="/c/Strawberry/perl/bin:$PATH"
fi

# Cleanup.
function cleanup {
    rm -rf tango_win_workdir
}
trap cleanup EXIT
cleanup

# Build Windows binaries. MSVC target — statically links the MSVC
# runtime so no mingw DLL bundling is needed.
cargo build --bin tango4-replayviewer --release --target x86_64-pc-windows-msvc

# Assemble zip contents.
mkdir tango_win_workdir
pushd tango_win_workdir

cp ../target/x86_64-pc-windows-msvc/release/tango4-replayviewer.exe .

angle_zip_url="https://github.com/google/gfbuild-angle/releases/download/github%2Fgoogle%2Fgfbuild-angle%2Ff810e998993290f049bbdad4fae975e4867100ad/gfbuild-angle-f810e998993290f049bbdad4fae975e4867100ad-Windows_x64_Release.zip"
curl -L -o angle.zip "${angle_zip_url}"
unzip -o -j angle.zip "lib/libEGL.dll" "lib/libGLESv2.dll" -d .
rm angle.zip

ffmpeg_version="6.0"
curl -L -o ffmpeg.exe "https://github.com/eugeneware/ffmpeg-static/releases/download/b${ffmpeg_version}/ffmpeg-win32-x64"

popd

mkdir -p dist
# Git Bash on Windows doesn't ship `zip`; use the preinstalled 7-Zip
# instead. `-tzip` forces the zip format (default would be 7z).
(cd tango_win_workdir && 7z a -tzip ../dist/tango4-replayviewer-x86_64-windows.zip .)
rm -rf tango_win_workdir
