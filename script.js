let periodicTable = {};

fetch('periodic_table.xlsx')
    .then(response => {
        if (!response.ok) throw new Error("HTTP error " + response.status);
        return response.arrayBuffer();
    })
    .then(data => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log('Raw data:', rawData); 
        convertToObject(rawData);
    })
    .catch(err => {
        console.error("Failed to load Excel file:", err);
    });

function convertToObject(data) {
    const keys = data[0];
    periodicTable = data.slice(1).reduce((acc, row) => {
        const element = {};
        keys.forEach((key, i) => {
            element[key.toLowerCase()] = row[i];
        });
        acc[element.symbol.toLowerCase()] = element;
        acc[element.name.toLowerCase()] = element;
        return acc;
    }, {});
    console.log('Processed data:', periodicTable); 
}

function searchElement() {
    const input = document.getElementById('elementInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Searching...';

    console.log('Search input:', input); 

    if (input === "") {
        resultDiv.innerHTML = "<p>Please enter an element name or symbol.</p>";
        return;
    }

    const element = periodicTable[input];
    
    console.log('Element found:', element); 

    if (element) {
        resultDiv.innerHTML = `
            <h2>${element.name} (${element.symbol})</h2>
            <p>Atomic Number: ${element['atomic number']}</p>
            <p>Atomic Mass: ${element['atomic mass']}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p>No element found with the name or symbol "${input}"</p>`;
    }
}
