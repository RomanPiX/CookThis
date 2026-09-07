# Generates PNG app icons with System.Drawing (Windows PowerShell 5.1).
Add-Type -AssemblyName System.Drawing
$out = Join-Path $PSScriptRoot 'icons'

function Draw-Icon([int]$size, [string]$file, [bool]$maskable) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([System.Drawing.Color]::Transparent)
  $green = [System.Drawing.ColorTranslator]::FromHtml('#16557E')
  $cream = [System.Drawing.ColorTranslator]::FromHtml('#FFFFFF')
  $lemon = [System.Drawing.ColorTranslator]::FromHtml('#DE9433')
  $s = $size / 128.0

  # Background: rounded square (or full square when maskable; content shrunk into safe zone)
  $bg = New-Object System.Drawing.SolidBrush $green
  if ($maskable) {
    $g.FillRectangle($bg, 0, 0, $size, $size)
    $s = $s * 0.8
    $g.TranslateTransform($size * 0.1, $size * 0.1)
  } else {
    $r = 28 * $s
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, 2*$r, 2*$r, 180, 90)
    $path.AddArc($size - 2*$r, 0, 2*$r, 2*$r, 270, 90)
    $path.AddArc($size - 2*$r, $size - 2*$r, 2*$r, 2*$r, 0, 90)
    $path.AddArc(0, $size - 2*$r, 2*$r, 2*$r, 90, 90)
    $path.CloseFigure()
    $g.FillPath($bg, $path)
  }

  # Bowl: bottom half of a circle centred (64,68) r=36, plus a rim
  $creamBrush = New-Object System.Drawing.SolidBrush $cream
  $g.FillPie($creamBrush, [single](28*$s), [single](32*$s), [single](72*$s), [single](72*$s), 0, 180)
  $rim = New-Object System.Drawing.Drawing2D.GraphicsPath
  $rr = 4.5 * $s
  $rim.AddArc([single](22*$s), [single](63*$s), 2*$rr, 2*$rr, 90, 180)
  $rim.AddArc([single](106*$s - 2*$rr), [single](63*$s), 2*$rr, 2*$rr, 270, 180)
  $rim.CloseFigure()
  $g.FillPath($creamBrush, $rim)

  # Steam: three lemon curves
  $pen = New-Object System.Drawing.Pen $lemon, ([single](5*$s))
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  foreach ($x in @(46, 64, 82)) {
    $y0 = if ($x -eq 64) { 54 } else { 52 }
    $p1 = New-Object System.Drawing.PointF ([single]($x*$s)), ([single]($y0*$s))
    $p2 = New-Object System.Drawing.PointF ([single]($x*$s)), ([single](($y0-7)*$s))
    $p3 = New-Object System.Drawing.PointF ([single](($x+7)*$s)), ([single](($y0-7)*$s))
    $p4 = New-Object System.Drawing.PointF ([single](($x+7)*$s)), ([single](($y0-14)*$s))
    $p5 = New-Object System.Drawing.PointF ([single](($x+7)*$s)), ([single](($y0-21)*$s))
    $p6 = New-Object System.Drawing.PointF ([single]($x*$s)), ([single](($y0-21)*$s))
    $p7 = New-Object System.Drawing.PointF ([single]($x*$s)), ([single](($y0-28)*$s))
    $g.DrawBeziers($pen, [System.Drawing.PointF[]]@($p1, $p2, $p3, $p4, $p5, $p6, $p7))
  }

  $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

Draw-Icon 192 'icon-192.png' $false
Draw-Icon 512 'icon-512.png' $false
Draw-Icon 512 'icon-maskable-512.png' $true
Write-Output "icons written to $out"
