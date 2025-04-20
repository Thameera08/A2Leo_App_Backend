# Import the Excel module
Import-Module ImportExcel
Import-Module Mdbc

$mongoUri = "mongodb+srv://A2APP:LeoApp@a2app.roe7s.mongodb.net"
$databaseName = "a2App"
$collectionName = "clubs"
# Define the path to the Excel file
$excelFilePath = "D:\A2\New 2024-25\A2 App Content.xlsx"
$sheetName = "Edits Club Details"

$currentClub = ''

function Handle-Error {
    param (
        [string]$message
    )
    Write-Host "Error: $message" -ForegroundColor Red
    exit 1
}
# Read the Excel file
try {
    $excelData = Import-Excel -Path $excelFilePath -WorksheetName $sheetName
} catch {
    Handle-Error "Failed to read Excel file. $_"
}

# Connect to MongoDB
try {
    $client = Connect-Mdbc -ConnectionString $mongoUri -DatabaseName $databaseName
    $collection = Get-MdbcCollection -Name $collectionName
} catch {
    Handle-Error "Failed to connect to MongoDB. $_"
}


# Initialize an array to hold the JSON objects
$allClubs = @()
$num = 1

# Loop through each row in the Excel data
foreach ($row in $data) {
    # Check if the row contains a new club name
    if ($row.'Leo Club Name' -ne $null ) {
        $currentClub = $row.'Leo Club Name'

        # Initialize a new club object
        $currentClubDoc = @{
            id = "CLUB_$($row.No)"
            club_name = $currentClub
            Officers = @{
                clubPresident = @{
                    name = $row.Name
                    email = $row.'Email Address'
                    contact = $row.'Contact Number'
                }
                Secretary = @{
                    name = ""
                    email = ""
                    contact = ""
                }
                VicePresident= @{
                    name = ""
                    email = ""
                    contact = ""
                }
                Treasurer = @{
                    name = ""
                    email = ""
                    contact = ""
                }
                Advisor = @{
                    name = ""
                    email = ""
                    contact = ""
                }
                StaffAdvisor = @{
                    name = ""
                    email = ""
                    contact = ""
                }
            }
        }
        $num++
        # Add the club to the list
        $allClubs += $currentClubDoc
        Write-Host "$currentClub was added"
        Write-Host $row.Name " was added as $currentClub president"
    }

    # Update the Secretary details if the position is "Secretary"
    if ($row.Position -eq "Secretary" -and $currentClubDoc) {
        $currentClubDoc.Officers.Secretary.name = $row.Name
        $currentClubDoc.Officers.Secretary.email = $row.'Email Address'
        $currentClubDoc.Officers.Secretary.contact = $row.'Contact Number'

        Write-Host $row.Name " was added as $currentClub Secretary"
    }
    elseif ($row.Position -eq "Vice President") {
      
        $currentClubDoc.Officers.VicePresident.name = $row.Name
        $currentClubDoc.Officers.VicePresident.email = $row.'Email Address'
        $currentClubDoc.Officers.VicePresident.contact = $row.'Contact Number'

        Write-Host $row.Name " was added as $currentClub Vice President"
    }
    elseif ($row.Position -eq "Treasurer") {
        $currentClubDoc.Officers.Treasurer.name = $row.Name
        $currentClubDoc.Officers.Treasurer.email = $row.'Email Address'
        $currentClubDoc.Officers.Treasurer.contact = $row.'Contact Number'

        Write-Host $row.Name " was added as $currentClub Treasurer"
    }
    elseif ($row.Position -eq "Club Advisor" -or $row.Position -eq "Staff Advisor") {
       
        $currentClubDoc.Officers.Advisor.name = $row.Name
        $currentClubDoc.Officers.Advisor.email = $row.'Email Address'
        $currentClubDoc.Officers.Advisor.contact = $row.'Contact Number'

        Write-Host $row.Name " was added as $currentClub Club Advisor"
    }
    
} 

foreach ($club in $allClubs){
    try {
        
        Add-MdbcData -Collection $collection -InputObject $club
        Write-Host "$($club.club_name) has been added to DB"
    } catch {
        Handle-Error "Failed to insert document into MongoDB. $_"
    }
}

# Convert the array to JSON
$jsonOutput = $allClubs | ConvertTo-Json -Depth 3
#Write-Host $allClubs

# Output the JSON to a file
$jsonOutput | Out-File -FilePath "D:\A2\New 2024-25\A2Clubs.json"
Write-Host "$num of Clubs added" -ForegroundColor Green
