# Generates the PNG app icons: a margherita on black. Run after changing the mark in
# src/js/palettes.js so the app, the tab and the home screen all show the same drawing.
Add-Type -AssemblyName System.Drawing
$out = Join-Path $PSScriptRoot 'icons'

function New-Brush([string]$hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function Draw-Icon([int]$size, [string]$file, [bool]$maskable) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([System.Drawing.Color]::Transparent)

  $black = New-Brush '#0C0C0D'
  $crust = New-Brush '#E0B268'
  $sauce = New-Brush '#C0392B'
  $cheese = New-Brush '#F5E9D2'
  $basil = New-Brush '#3E7D3A'

  # Background. A maskable icon is a full square with the pizza pulled into the safe zone.
  if ($maskable) {
    $g.FillRectangle($black, 0, 0, $size, $size)
  } else {
    $r = $size * 0.11
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, 2*$r, 2*$r, 180, 90)
    $path.AddArc($size - 2*$r, 0, 2*$r, 2*$r, 270, 90)
    $path.AddArc($size - 2*$r, $size - 2*$r, 2*$r, 2*$r, 0, 90)
    $path.AddArc(0, $size - 2*$r, 2*$r, 2*$r, 90, 90)
    $path.CloseFigure()
    $g.FillPath($black, $path)
  }

  $s = $size / 128.0
  if ($maskable) { $s = $s * 0.78; $g.TranslateTransform($size * 0.11, $size * 0.11) }

  function Circle($brush, [double]$cx, [double]$cy, [double]$rad) {
    $g.FillEllipse($brush, [single](($cx - $rad) * $s), [single](($cy - $rad) * $s), [single](2*$rad*$s), [single](2*$rad*$s))
  }

  Circle $crust 64 64 47
  Circle $sauce 64 64 39
  Circle $cheese 49 52 9
  Circle $cheese 79 49 7
  Circle $cheese 52 81 8
  Circle $cheese 80 76 9
  # Basil leaves: small ovals, drawn rotated around their own centre.
  foreach ($leaf in @(@(64, 64, 6, 4, -25), @(41, 68, 5, 3.4, 20), @(70, 93, 5, 3.4, -10))) {
    $state = $g.Save()
    $g.TranslateTransform([single]($leaf[0] * $s), [single]($leaf[1] * $s))
    $g.RotateTransform([single]$leaf[4])
    $g.FillEllipse($basil, [single](-$leaf[2] * $s), [single](-$leaf[3] * $s), [single](2 * $leaf[2] * $s), [single](2 * $leaf[3] * $s))
    $g.Restore($state)
  }

  $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

Draw-Icon 192 'icon-192.png' $false
Draw-Icon 512 'icon-512.png' $false
Draw-Icon 512 'icon-maskable-512.png' $true
Write-Output "icons written to $out"
