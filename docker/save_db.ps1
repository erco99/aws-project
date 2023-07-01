$scriptDir=$PSScriptRoot
$outDir="$scriptDir\db-data\"
$dbName="aws-project-db"

function Prompt() {
    param (
        [Parameter()]
        [string] $PromptString
    )

    Do {
        $_YN = $(Write-Host $PromptString -ForegroundColor Blue -NoNewLine; Read-Host)
    }
    Until ($_YN -match '[Yy]' -or $_YN -match '[Nn]')
    return $_YN
}

function Install-DBTools() {
    $uri = "https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.7.3.zip"
    $dest = "$scriptDir\tmp\out.zip"
    New-Item -Path $scriptDir -Name "tmp" -ItemType "directory" -Force | Out-Null
    Write-Host "Starting db-tools download..."
    Start-BitsTransfer -Source $uri -Destination $dest
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error while downloading zip file" -ForegroundColor Red
        Exit
    }
    Write-Host "Zip file successfully downloaded"
    Write-Host "Extracting files..."
    Expand-Archive -LiteralPath $dest -DestinationPath "$scriptDir\tmp\" -Force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error while decompressing zip file" -ForegroundColor Red
        Exit
    }
    Write-Host "Files successfully extracted"
    Write-Host "Installing db-tools..."
    New-Item -Path "$scriptDir\utils" -Name "db-tools" -ItemType "directory" -Force | Out-Null
    Copy-Item -Path "$scriptDir\tmp\mongodb-database-tools-windows-x86_64-100.7.3\*" -Destination "$scriptDir\utils\db-tools" -Recurse
    Remove-Item -Path "$scriptDir\tmp" -Recurse -Force
    Write-Host "Db-tools successfully installed in .\utils\db-tools\ directory" -ForegroundColor Green
}

if((Test-Path $outDir) -and ((Get-ChildItem $outDir -force | Select-Object -First 1 | Measure-Object).Count -ne 0))
{
    Write-Host "Output directory is not empty, found data inside:" -ForegroundColor Red
    tree $outDir /f
    $YN = Prompt -PromptString "Would you like to overwrite data[Yes/No]?"
    if($YN -match '[Nn]') { Write-Host "No data has been modified"; Exit }
}

if (-Not (Where-Object mongodump)) {
    $mongodumpPath = "$scriptDir\utils\db-tools\bin\mongodump.exe"
    if (-Not ([System.IO.File]::Exists($mongodumpPath))) {
        Write-Host "ERROR: Command mongodump not found!" -ForegroundColor Red
        $YN = prompt -PromptString "Would you like to download it[Yes/No]?"
        if($YN -match '[Nn]') { Write-Host "No program has been installed, can't save data"; Exit }
        Install-DBTools
    }
    powershell -Command $scriptDir\utils\db-tools\bin\mongodump.exe -d $dbName -o $outDir
} else {
    powershell -Command mongodump -d $dbName -o $outDir
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error while saving data" -ForegroundColor Red
    Exit
} else {
    Write-Host "Data successfully saved!" -ForegroundColor Green
}