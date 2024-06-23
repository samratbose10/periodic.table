import openpyxl
import json
import os


print(f"Current working directory: {os.getcwd()}")

print("Script started")


file_path = r'C:\Users\Lenovo\Desktop\try\periodic_table.xlsx'
print(f"Excel file path: {file_path}")

try:
    workbook = openpyxl.load_workbook(file_path)
    sheet = workbook.active
    print("Excel file loaded successfully")
except Exception as e:
    print(f"Failed to load Excel file: {e}")
    exit(1)


data = []
headers = [cell.value for cell in sheet[1]] 
for row in sheet.iter_rows(min_row=2, values_only=True):
    entry = {headers[i]: row[i] for i in range(len(headers))}
    data.append(entry)


json_file_path = r'C:\Users\Lenovo\Desktop\try\periodic_table.json'
print(f"JSON file path: {json_file_path}")

try:
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    print("Dataframe converted to JSON successfully")
except Exception as e:
    print(f"Failed to convert dataframe to JSON: {e}")
    exit(1)


try:
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    print("JSON file read successfully")
except Exception as e:
    print(f"Failed to read JSON file: {e}")
    exit(1)


try:
    print(data)
    print("JSON data output successfully")
except Exception as e:
    print(f"Failed to output JSON data: {e}")
