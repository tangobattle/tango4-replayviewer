#!/bin/bash
set -euo pipefail

# Cleanup.
function cleanup {
    rm -rf tango_win_workdir
}
trap cleanup EXIT
cleanup

# Build Windows binaries.
cargo build --bin tango4-replayviewer --release --target x86_64-pc-windows-gnu

# Assemble zip contents.
mkdir tango_win_workdir
pushd tango_win_workdir

cp ../target/x86_64-pc-windows-gnu/release/tango4-replayviewer.exe .
cp {/usr/x86_64-w64-mingw32/lib/libwinpthread-1.dll,/usr/lib/gcc/x86_64-w64-mingw32/10-posix/{libgcc_s_seh-1.dll,libstdc++-6.dll}} .

angle_zip_url="https://github.com/google/gfbuild-angle/releases/download/github%2Fgoogle%2Fgfbuild-angle%2Ff810e998993290f049bbdad4fae975e4867100ad/gfbuild-angle-f810e998993290f049bbdad4fae975e4867100ad-Windows_x64_Release.zip"
mkdir angle
wget -O - "${angle_zip_url}" | bsdtar -Cangle -xvf- lib/{libEGL.dll,libGLESv2.dll}
cp angle/lib/{libEGL.dll,libGLESv2.dll} .
rm -rf angle

ffmpeg_version="6.0"
wget -O ffmpeg.exe "https://github.com/eugeneware/ffmpeg-static/releases/download/b${ffmpeg_version}/ffmpeg-win32-x64"

popd

mkdir -p dist
(cd tango_win_workdir && zip -r ../dist/tango4-replayviewer-x86_64-windows.zip .)
rm -rf tango_win_workdir
