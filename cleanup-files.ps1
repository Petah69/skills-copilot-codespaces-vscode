function zip-and-remove-old-files {
    param (
        [Parameter(Mandatory=$true)]
        [string]$path,
        [Parameter(Mandatory=$true)]
        [int]$days,
        [Parameter(Mandatory=$true)]
        [string]$zipPath
    )

    Write-Host "Zipping files older than $days days in $path to $zipPath"

    Get-ChildItem $path -Recurse -Force -File | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$days) } | Compress-Archive -DestinationPath $zipPath -CompressionLevel Optimal -Force
    Get-ChildItem $path -Recurse -Force -File | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$days) } | Remove-Item -Force
}

# zip-and-remove-old-files -path "C:\Users\user1\Downloads" -days 30 -zipPath "C:\Users\user1\Downloads\old-files.zip"
