# Install the Mdbc module if not already installed
if (-not (Get-Module -ListAvailable -Name Mdbc)) {
    Install-Module -Name Mdbc -Scope CurrentUser -Force
}

# Import the necessary modules
Import-Module ImportExcel
Import-Module Mdbc

# Define the Excel file path and sheet name
$excelFilePath = "D:\A2\New 2024-25\A2 App Content.xlsx"
$sheetName = "A2 Council"

# Define MongoDB connection details
$mongoUri = "mongodb+srv://A2APP:LeoApp@a2app.roe7s.mongodb.net"
$databaseName = "a2App"
$collectionName = "councils"

# Function to handle errors
function Handle-Error {
    param (
        [string]$message
    )
    Write-Host "Error: $message" -ForegroundColor Red
    exit 1
}

# Read data from Excel file
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

# Delete current data in the collection
try {
    $deleteResult = Remove-MdbcData -Collection $collection -Filter @{}
    Write-Host "Deleted $($deleteResult.DeletedCount) document(s)." -ForegroundColor Yellow
} catch {
    Handle-Error "Failed to delete current data in MongoDB. $_"
}

# Insert data into MongoDB
$num = 1
foreach ($row in $excelData) {
    if ($null -eq $row.name) {
        continue
    }
    try {
        $document = @{
            id = "coun_$num"
            name = $row.name
            position = $row.Designation
            club = $row.'Leo Club'
            email = $row.'Email Address'
            contact = $row.'Contact Number'
        }
        Add-MdbcData -Collection $collection -InputObject $document
        Write-Host "$($row.name) has been added as $($row.Designation)"
    } catch {
        Handle-Error "Failed to insert document into MongoDB. $_"
    }
    $num++
}

Write-Host "Data successfully inserted into MongoDB." -ForegroundColor Green
