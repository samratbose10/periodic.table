let periodicTable = {};

fetch('periodic_table.json')
    .then(response => response.json())
    .then(data => {
        console.log('Data from JSON:', data);  // Log the raw data from the JSON file

        periodicTable = data.reduce((acc, element) => {
            acc[element.Symbol.toLowerCase()] = element;
            acc[element.Name.toLowerCase()] = element;
            return acc;
        }, {});
        console.log('Processed data:', periodicTable);  // Log the processed data structure
    })
    .catch(err => {
        console.error("Failed to load JSON file:", err);
    });

function searchElement() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('elementDetails');
    resultDiv.innerHTML = 'Searching...';

    console.log('Search input:', input); 

    if (input === "") {
        resultDiv.innerHTML = "<p>Please enter an element name or symbol.</p>";
        return;
    }

    console.log('PeriodicTable object:', periodicTable); // Log the entire periodicTable object

    const element = periodicTable[input];
    
    console.log('Element found:', element);  // Log the found element or undefined if not found

    if (element) {
        resultDiv.innerHTML = `
            <h2>${element.Name} (${element.Symbol})</h2>
            <p>Atomic Number: ${element['Atomic Number']}</p>
            <p>Atomic Mass: ${element['Atomic Mass']}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p>No element found with the name or symbol "${input}"</p>`;
    }
}
