$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
Remove-Item -Recurse -Force 'src\fonts' -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path 'src\fonts' | Out-Null

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
$sources = @(
  @{ family = 'Archivo';       url = 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap' },
  @{ family = 'IBM Plex Mono'; url = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap' }
)

$out = New-Object System.Collections.Generic.List[string]
$seen = @{}

foreach ($src in $sources) {
  $css = (Invoke-WebRequest -Uri $src.url -Headers @{ 'User-Agent' = $ua } -UseBasicParsing).Content
  $blocks = [regex]::Matches($css, '@font-face\s*\{[^}]+\}')
  foreach ($b in $blocks) {
    $text = $b.Value
    if ($text -notmatch 'unicode-range:\s*U\+0000-00FF') { continue }
    if ($text -notmatch 'url\((https://[^)]+\.woff2)\)') { continue }
    $remote = $Matches[1]
    $weight = if ($text -match 'font-weight:\s*([0-9]+)') { $Matches[1] } else { '400' }
    $style  = if ($text -match 'font-style:\s*([a-z]+)') { $Matches[1] } else { 'normal' }
    $key = "$($src.family)|$weight|$style"
    if ($seen.ContainsKey($key)) { continue }
    $seen[$key] = $true
    $local = $remote.Split('/')[-1]
    Invoke-WebRequest -Uri $remote -OutFile (Join-Path 'src\fonts' $local) -UseBasicParsing
    $out.Add("@font-face {")
    $out.Add("  font-family: '$($src.family)';")
    $out.Add("  font-style: $style;")
    $out.Add("  font-weight: $weight;")
    $out.Add("  font-display: swap;")
    $out.Add("  src: url('./$local') format('woff2');")
    $out.Add("  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;")
    $out.Add("}")
    $out.Add("")
    Write-Output "$($src.family) $weight $style -> $local"
  }
}

$out -join [Environment]::NewLine | Out-File -FilePath 'src\fonts\fonts.css' -Encoding utf8
Write-Output ('faces written: ' + $seen.Count)
