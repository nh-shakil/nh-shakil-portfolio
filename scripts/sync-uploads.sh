#!/usr/bin/env bash
set -euo pipefail

for dir in projects gallery cvs blog; do
    if [ -d "storage/app/public/${dir}" ]; then
        mkdir -p "public/uploads/${dir}"
        cp -R "storage/app/public/${dir}/." "public/uploads/${dir}/"
    fi
done
