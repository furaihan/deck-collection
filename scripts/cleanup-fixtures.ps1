$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
foreach ($d in @('broken-demo', 'private-probe', 'signals-aliasing')) {
  $path = Join-Path 'presentations' $d
  if (Test-Path $path) { Remove-Item -Recurse -Force $path; Write-Output "removed $d" }
}
Get-ChildItem 'presentations' | Select-Object Name | Format-Table -AutoSize | Out-String
