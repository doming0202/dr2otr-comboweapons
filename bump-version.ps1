# bump-version.ps1
# ==========================================================
# Tauri Project Version Bumper (PowerShell)
#  - package.json
#  - src-tauri\tauri.conf.json
#  - src-tauri\Cargo.toml
#
# Usage:
#   pwsh .\bump-version.ps1 --check
#   pwsh .\bump-version.ps1 0.6.1
#   pwsh .\bump-version.ps1 0.6.1 --dry
#   pwsh .\bump-version.ps1 0.6.1 --diff
#
# Notes:
#  - Run this script in the project root directory.
#  - Creates .bak backups and restores on failure.
# ==========================================================

param(
  [Parameter(Position = 0)]
  [string]$Version = "",

  [switch]$Check,
  [switch]$Dry,
  [switch]$Diff
)

$ErrorActionPreference = 'Stop'

# --- Files (relative) ---
$PKG   = "package.json"
$TAURI = "src-tauri\tauri.conf.json"
$CARGO = "src-tauri\Cargo.toml"

function Assert-File($path) {
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Not found: $path`nPut this script in your project root or run it there."
  }
}

function Backup-File($path) {
  Copy-Item -LiteralPath $path -Destination ($path + ".bak") -Force
}

function Restore-File($path) {
  $bak = $path + ".bak"
  if (Test-Path -LiteralPath $bak) {
    Copy-Item -LiteralPath $bak -Destination $path -Force
  }
}

function Pick([string]$v) {
  if ([string]::IsNullOrWhiteSpace($v)) { return "(not found)" }
  return $v
}

function Get-VersionFromJson([string]$path) {
  $c = Get-Content -LiteralPath $path -Raw
  $m = [regex]::Match($c, '"version"\s*:\s*"([^"]+)"')
  if (-not $m.Success) { return "" }
  return $m.Groups[1].Value
}

function Get-VersionFromCargo([string]$path) {
  $c = Get-Content -LiteralPath $path -Raw
  $m = [regex]::Match($c, '(?m)^version\s*=\s*"([^"]+)"')
  if (-not $m.Success) { return "" }
  return $m.Groups[1].Value
}

function Replace-Once([string]$path, [string]$pattern, [string]$replacement) {
  $c = Get-Content -LiteralPath $path -Raw

  if (-not [regex]::IsMatch($c, $pattern)) {
    throw "Pattern not found in: $path"
  }

  $n = [regex]::Replace($c, $pattern, $replacement, 1)

  if ($n -eq $c) {
    throw "No change applied: $path"
  }

  return $n
}

# --- Check paths ---
Assert-File $PKG
Assert-File $TAURI
Assert-File $CARGO

Write-Host ""
Write-Host "========================================="
Write-Host " Tauri Project Version Bumper (PowerShell)"
Write-Host "========================================="
Write-Host ("[INFO] Current Dir: " + (Get-Location).Path)
Write-Host ""

# --- show current versions ---
$pv0 = Get-VersionFromJson  $PKG
$tv0 = Get-VersionFromJson  $TAURI
$cv0 = Get-VersionFromCargo $CARGO

Write-Host "--- Current versions ---"
Write-Host ("package.json    : " + (Pick $pv0))
Write-Host ("tauri.conf.json : " + (Pick $tv0))
Write-Host ("Cargo.toml      : " + (Pick $cv0))
Write-Host ""

if ($Check) {
  Write-Host "[INFO] --check mode (no changes)"
  exit 0
}

# --- interactive input if missing ---
if ([string]::IsNullOrWhiteSpace($Version)) {
  $Version = Read-Host "Enter new version (e.g. 0.6.1)"
}

if ([string]::IsNullOrWhiteSpace($Version)) {
  throw "version is empty."
}

Write-Host ("[INFO] Target version: " + $Version)
if ($Dry) {
  Write-Host "[INFO] DRY-RUN: enabled (no files will be written)"
}
Write-Host ""

# --- backups ---
Backup-File $PKG
Backup-File $TAURI
Backup-File $CARGO

try {
  # --- prepare replaced content ---
  $pkg2 = Replace-Once $PKG   '"version"\s*:\s*"[^"]+"' ('"version": "' + $Version + '"')
  $ta2  = Replace-Once $TAURI '"version"\s*:\s*"[^"]+"' ('"version": "' + $Version + '"')
  $cg2  = Replace-Once $CARGO '(?m)^(version\s*=\s*")([^"]+)(")' ('${1}' + $Version + '${3}')

  if (-not $Dry) {
    Set-Content -LiteralPath $PKG   -Value $pkg2 -Encoding UTF8
    Set-Content -LiteralPath $TAURI -Value $ta2  -Encoding UTF8
    Set-Content -LiteralPath $CARGO -Value $cg2  -Encoding UTF8
  }

  Write-Host "--- After ---"
  Write-Host ("package.json    : " + $Version)
  Write-Host ("tauri.conf.json : " + $Version)
  Write-Host ("Cargo.toml      : " + $Version)
  Write-Host ""

  if ($Dry) {
    Write-Host "[DRY] No files were written."
    Write-Host "[INFO] Restoring originals (no changes kept)."
    Restore-File $PKG
    Restore-File $TAURI
    Restore-File $CARGO
  } else {
    Write-Host ("OK: updated all versions to " + $Version)
  }

  if ($Diff) {
    Write-Host ""
    try {
      git --version | Out-Null
      Write-Host "[INFO] git diff..."
      git diff -- $PKG $TAURI $CARGO
    } catch {
      Write-Host "[WARN] git not found. Skipping diff."
    }
  }

  exit 0
}
catch {
  Write-Host ""
  Write-Host "[ERROR] Failed to update files."
  Write-Host ("        " + $_.Exception.Message)
  Write-Host "        Restoring from .bak ..."
  Restore-File $PKG
  Restore-File $TAURI
  Restore-File $CARGO
  Write-Host "[INFO] Restored."
  exit 1
}
