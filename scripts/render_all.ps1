Add-Type -AssemblyName System.Drawing

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$projectRoot = "C:\git\Pokemon-GO-event-tracker"
$tempDir = Join-Path $projectRoot "temp_render"
$storiesDir = Join-Path $projectRoot "stories"

$sections = @(
  "weekly_lineup",
  "monthly_lineup",
  "community_days",
  "spotlight_hour",
  "raid_rotation",
  "special_events"
)

foreach ($id in $sections) {
  # 1. Render Story (9:16 - 1080x1920)
  $storyHtml = "file:///" + (Join-Path $tempDir "story_$id.html").Replace('\', '/')
  $storyPng = Join-Path $tempDir "story_$id.png"
  $storyJpg = Join-Path $storiesDir "story_$id.jpg"

  Write-Host "Rendering Story: $id (1080x1920)..."
  Start-Process -FilePath $edge -ArgumentList "--headless", "--hide-scrollbars", "--window-size=1080,1920", "--screenshot=`"$storyPng`"", "`"$storyHtml`"" -Wait
  
  if (Test-Path $storyPng) {
    $img = [System.Drawing.Image]::FromFile($storyPng)
    $img.Save($storyJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $img.Dispose()
    Write-Host "Saved: $storyJpg"
  } else {
    Write-Host "Failed to screenshot $storyPng" -ForegroundColor Red
  }

  # 2. Render Cover (1:1 - 1080x1080)
  $coverHtml = "file:///" + (Join-Path $tempDir "cover_$id.html").Replace('\', '/')
  $coverPng = Join-Path $tempDir "cover_$id.png"
  $coverJpg = Join-Path $storiesDir "cover_$id.jpg"

  Write-Host "Rendering Cover: $id (1080x1080)..."
  Start-Process -FilePath $edge -ArgumentList "--headless", "--hide-scrollbars", "--window-size=1080,1080", "--screenshot=`"$coverPng`"", "`"$coverHtml`"" -Wait
  
  if (Test-Path $coverPng) {
    $img = [System.Drawing.Image]::FromFile($coverPng)
    $img.Save($coverJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $img.Dispose()
    Write-Host "Saved: $coverJpg"
  } else {
    Write-Host "Failed to screenshot $coverPng" -ForegroundColor Red
  }
}

Write-Host "ALL 12 JPGs RENDERED SUCCESSFULLY!" -ForegroundColor Green
