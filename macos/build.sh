#!/bin/bash
set -euo pipefail

# Cleanup.
function cleanup {
    rm -rf tango_macos_workdir
}
trap cleanup EXIT
cleanup

# Build macOS universal binary.
cargo build --bin tango4-replayviewer --target=aarch64-apple-darwin --release
cargo build --bin tango4-replayviewer --target=x86_64-apple-darwin --release

mkdir tango_macos_workdir
lipo -create target/{aarch64-apple-darwin,x86_64-apple-darwin}/release/tango4-replayviewer -output tango_macos_workdir/tango4-replayviewer

ffmpeg_version="6.0"
wget -O tango_macos_workdir/ffmpeg-arm64 "https://github.com/eugeneware/ffmpeg-static/releases/download/b${ffmpeg_version}/ffmpeg-darwin-arm64"
wget -O tango_macos_workdir/ffmpeg-x64 "https://github.com/eugeneware/ffmpeg-static/releases/download/b${ffmpeg_version}/ffmpeg-darwin-x64"
lipo -create tango_macos_workdir/ffmpeg-{arm64,x64} -output tango_macos_workdir/ffmpeg
chmod a+x tango_macos_workdir/ffmpeg
rm tango_macos_workdir/ffmpeg-{arm64,x64}

mkdir -p dist
(cd tango_macos_workdir && zip -r ../dist/tango4-replayviewer-macos.zip .)
rm -rf tango_macos_workdir
