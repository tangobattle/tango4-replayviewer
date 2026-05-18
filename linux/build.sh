#!/bin/bash
set -euo pipefail

# Cleanup.
function cleanup {
	rm -rf tango_linux_workdir
}
trap cleanup EXIT
cleanup

# Build Linux binaries.
target_arch="x86_64"
cargo build --bin tango4-replayviewer --target="${target_arch}-unknown-linux-gnu" --no-default-features --features=sdl2-audio,wgpu,cpal --release

# Assemble zip contents.
mkdir -p tango_linux_workdir
cp "target/${target_arch}-unknown-linux-gnu/release/tango4-replayviewer" "tango_linux_workdir/tango4-replayviewer"

# Bundle ffmpeg.
ffmpeg_version="6.0"
wget "https://github.com/eugeneware/ffmpeg-static/releases/download/b${ffmpeg_version}/ffmpeg-linux-x64" -O "tango_linux_workdir/ffmpeg"
chmod a+x "tango_linux_workdir/ffmpeg"

mkdir -p dist
(cd tango_linux_workdir && zip -r "../dist/tango4-replayviewer-${target_arch}-linux.zip" .)
rm -rf tango_linux_workdir
