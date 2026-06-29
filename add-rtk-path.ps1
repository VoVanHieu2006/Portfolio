$currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($currentPath -notlike '*C:\Users\Acer\.local\bin*') {
    [Environment]::SetEnvironmentVariable('Path', $currentPath + ';C:\Users\Acer\.local\bin', 'User')
    Write-Host 'Added to PATH'
} else {
    Write-Host 'Already in PATH'
}