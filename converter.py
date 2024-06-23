import openpyxl
import json
import os

# Print the current working directory
print(f"Current working directory: {os.getcwd()}")

# Print a message to indicate script start
print("Script started")

# Load the Excel file
file_path = r'C:\Users\Lenovo\Desktop\try\periodic_table.xlsx'
print(f"Excel file path: {file_path}")

try:
    workbook = openpyxl.load_workbook(file_path)
    sheet = workbook.active
    print("Excel file loaded successfully")
except Exception as e:
    print(f"Failed to load Excel file: {e}")
    exit(1)

# Convert Excel data to a list of dictionaries
data = []
headers = [cell.value for cell in sheet[1]]  # Assumes the first row is the header
for row in sheet.iter_rows(min_row=2, values_only=True):
    entry = {headers[i]: row[i] for i in range(len(headers))}
    data.append(entry)

# Convert the list of dictionaries to a JSON file
json_file_path = r'C:\Users\Lenovo\Desktop\try\periodic_table.json'
print(f"JSON file path: {json_file_path}")

try:
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    print("Dataframe converted to JSON successfully")
except Exception as e:
    print(f"Failed to convert dataframe to JSON: {e}")
    exit(1)

# Read the JSON file to display its content
try:
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    print("JSON file read successfully")
except Exception as e:
    print(f"Failed to read JSON file: {e}")
    exit(1)

# Output the JSON data for verification (optional step)
try:
    print(data)
    print("JSON data output successfully")
except Exception as e:
    print(f"Failed to output JSON data: {e}")
