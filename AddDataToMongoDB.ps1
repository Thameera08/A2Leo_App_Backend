# Prompt the user before proceeding
$response = Read-Host "⚠️  This operation will DELETE all current Club and Council data and insert new data from the Excel file. Are you sure you want to proceed? (y/n)"
if ($response -ne 'y') {
    Write-Host "Operation cancelled by user." -ForegroundColor Yellow
    exit
}

# Ask user for Excel path
$excelFilePath = Read-Host "Enter the full path to the Excel file (e.g. D:\A2\New 2024-25\A2 App Content.xlsx)"
$sheetClubs = "Edits Club Details"
$sheetCouncil = "A2 Council"

# MongoDB details
$mongoUri = "mongodb+srv://A2APP:LeoApp@a2app.roe7s.mongodb.net"
$dbName = "a2App"
$clubCollectionName = "clubs"
$councilCollectionName = "councils"

# Install required modules if missing
if (-not (Get-Module -ListAvailable -Name Mdbc)) {
    Install-Module -Name Mdbc -Scope CurrentUser -Force
}
Import-Module ImportExcel
Import-Module Mdbc

# Function to handle errors
function Handle-Error {
    param (
        [string]$message
    )
    Write-Host "Error: $message" -ForegroundColor Red
    exit 1
}

# Connect to MongoDB
try {
    $client = Connect-Mdbc -ConnectionString $mongoUri -DatabaseName $dbName
    $clubCollection = Get-MdbcCollection -Name $clubCollectionName
    $councilCollection = Get-MdbcCollection -Name $councilCollectionName
} catch {
    Handle-Error "Failed to connect to MongoDB. $_"
}

# Delete all existing data
try {
    $deletedClubs = Remove-MdbcData -Collection $clubCollection -Filter @{}
    $deletedCouncil = Remove-MdbcData -Collection $councilCollection -Filter @{}
    Write-Host "Deleted $($deletedClubs.DeletedCount) Club documents and $($deletedCouncil.DeletedCount) Council documents." -ForegroundColor Yellow
} catch {
    Handle-Error "Failed to delete current data in MongoDB. $_"
}

# ========== CLUB INSERTION ==========
$currentClub = ''
$allClubs = @()
$num = 1

# Read club data
try {
    $clubData = Import-Excel -Path $excelFilePath -WorksheetName $sheetClubs
} catch {
    Handle-Error "Failed to read Club data from Excel. $_"
}

# Process each row
foreach ($row in $clubData) {
    if ($row.'Leo Club Name' -ne $null) {
        $currentClub = $row.'Leo Club Name'
        $currentClubDoc = @{
            id = "CLUB_$($row.No)"
            club_name = $currentClub
            Officers = @{
                clubPresident = @{
                    name = $row.Name
                    email = $row.'Email Address'
                    contact = $row.'Contact Number'
                }
                Secretary = @{ name = ""; email = ""; contact = "" }
                VicePresident = @{ name = ""; email = ""; contact = "" }
                Treasurer = @{ name = ""; email = ""; contact = "" }
                Advisor = @{ name = ""; email = ""; contact = "" }
                StaffAdvisor = @{ name = ""; email = ""; contact = "" }
            }
        }
        $allClubs += $currentClubDoc
        Write-Host "$currentClub was added"
        Write-Host "$($row.Name) was added as $currentClub President"
    }

    if ($row.Position -eq "Secretary") {
        $currentClubDoc.Officers.Secretary.name = $row.Name
        $currentClubDoc.Officers.Secretary.email = $row.'Email Address'
        $currentClubDoc.Officers.Secretary.contact = $row.'Contact Number'
        Write-Host "$($row.Name) was added as $currentClub Secretary"
    } elseif ($row.Position -eq "Vice President") {
        $currentClubDoc.Officers.VicePresident.name = $row.Name
        $currentClubDoc.Officers.VicePresident.email = $row.'Email Address'
        $currentClubDoc.Officers.VicePresident.contact = $row.'Contact Number'
        Write-Host "$($row.Name) was added as $currentClub Vice President"
    } elseif ($row.Position -eq "Treasurer") {
        $currentClubDoc.Officers.Treasurer.name = $row.Name
        $currentClubDoc.Officers.Treasurer.email = $row.'Email Address'
        $currentClubDoc.Officers.Treasurer.contact = $row.'Contact Number'
        Write-Host "$($row.Name) was added as $currentClub Treasurer"
    } elseif ($row.Position -eq "Club Advisor" -or $row.Position -eq "Staff Advisor") {
        $currentClubDoc.Officers.Advisor.name = $row.Name
        $currentClubDoc.Officers.Advisor.email = $row.'Email Address'
        $currentClubDoc.Officers.Advisor.contact = $row.'Contact Number'
        Write-Host "$($row.Name) was added as $currentClub Club Advisor"
    }
}

# Insert into MongoDB
foreach ($club in $allClubs) {
    try {
        Add-MdbcData -Collection $clubCollection -InputObject $club
        Write-Host "$($club.club_name) has been added to DB"
    } catch {
        Handle-Error "Failed to insert club document. $_"
    }
}

# Export to JSON with watermark
$jsonOutput = $allClubs | ConvertTo-Json -Depth 3
$jsonPath = [System.IO.Path]::Combine((Split-Path -Path $excelFilePath -Parent), "A2Clubs.json")
$watermark = "# Inserted from Excel path: $excelFilePath`n"
$watermark + $jsonOutput | Out-File -FilePath $jsonPath -Encoding utf8
Write-Host "Club data exported with watermark to $jsonPath" -ForegroundColor Cyan

# ========== COUNCIL INSERTION ==========

# Read council data
try {
    $councilData = Import-Excel -Path $excelFilePath -WorksheetName $sheetCouncil
} catch {
    Handle-Error "Failed to read Council data from Excel. $_"
}

# Insert council members
$num = 1
foreach ($row in $councilData) {
    if ($null -eq $row.name) { continue }
    try {
        $document = @{
            id = "coun_$num"
            name = $row.name
            position = $row.Designation
            club = $row.'Leo Club'
            email = $row.'Email Address'
            contact = $row.'Contact Number'
        }
        Add-MdbcData -Collection $councilCollection -InputObject $document
        Write-Host "$($row.name) has been added as $($row.Designation)"
    } catch {
        Handle-Error "Failed to insert council document. $_"
    }
    $num++
}

Write-Host "✅ Club and Council data successfully inserted into MongoDB." -ForegroundColor Green
