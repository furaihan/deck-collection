$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

Write-Output '=== TYPECHECK ==='
bun run typecheck 2>&1 | Out-String | Write-Output
Write-Output ('typecheck exit: ' + $LASTEXITCODE)

Write-Output '=== BUILD ==='
bun run build 2>&1 | Out-String | Write-Output
Write-Output ('build exit: ' + $LASTEXITCODE)

Write-Output '=== LOCKFILE ==='
Write-Output ('bun.lock present: ' + (Test-Path 'bun.lock'))
Write-Output ('package-lock.json present: ' + (Test-Path 'package-lock.json'))
Write-Output ('yarn.lock present: ' + (Test-Path 'yarn.lock'))
Write-Output ('pnpm-lock.yaml present: ' + (Test-Path 'pnpm-lock.yaml'))
