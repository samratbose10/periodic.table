import pandas as pd
import json


file_path = r'C:\Users\lenovo\Desktop\interactiv periodic table\periodic_table.xlsx'
df = pd.read_excel(file_path)


json_file_path = r'C:\Users\lenovo\Desktop\interactiv periodic table\periodic_table.json'
df.to_json(json_file_path, orient='records')


with open(json_file_path, 'r') as file:
    data = json.load(file)


import ace_tools as tools
tools.display_dataframe_to_user(name="Periodic Table Data", dataframe=df)


print(data)
