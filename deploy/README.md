# deploy/

Files for running Deck Loader on a plain VPS. No Docker, no systemd units, no
CI: `./deploy/deploy.sh` is the whole pipeline.

| file | purpose |
| --- | --- |
| `deploy.sh` | pull, install, build, rsync `dist/` into the web root |
| `nginx.conf.example` | static SPA server block with compression and caching |

Full first-time setup is in [../README.md](../README.md#deploy).

## Using deploy.sh

```bash
./deploy/deploy.sh                          # /var/www/presentations
WEB_ROOT=/srv/www/presentations ./deploy/deploy.sh
```

If git lost the executable bit (a Windows checkout does), run it as
`bash deploy/deploy.sh` or restore it with `chmod +x deploy/deploy.sh`.

It runs `git pull --ff-only`, `bun install --frozen-lockfile`, `bun run build`,
then `rsync -a --delete dist/ "$WEB_ROOT/"`, with `set -euo pipefail` so the
first failure stops it. Playwright is never invoked: PDFs are committed from the
author's machine and copied out of `exports/` during the build.
