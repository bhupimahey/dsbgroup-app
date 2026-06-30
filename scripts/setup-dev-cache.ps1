# REMOVED: Windows junction cache breaks Turbopack module resolution
# (PostCSS/Tailwind cannot resolve from C:\ cache when node_modules is on F:\).
# For faster dev, move the whole project to a local SSD (e.g. C:\Dev\pervinder-nextjs).

Write-Host 'This script is disabled — junction cache breaks Turbopack CSS builds.' -ForegroundColor Yellow
Write-Host 'Move the project to C:\ for faster compiles, or keep .next on F:\ and ignore the slow filesystem warning.'
exit 1
