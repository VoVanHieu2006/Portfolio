$bytes = [System.IO.File]::ReadAllBytes(".env.local")
$hex = ($bytes[0..2] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '
Write-Host "First 3 bytes: $hex"
Write-Host "File size: $($bytes.Length) bytes"