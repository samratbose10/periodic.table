async function searchElement() {
    const input = document.getElementById('elementInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Searching...';

    if (input === "") {
        resultDiv.innerHTML = "<p>Please enter an element name or symbol.</p>";
        return;
    }

    let url;

    // Check if input is a number (atomic number) or a string (element name/symbol)
    if (!isNaN(input)) {
        // Input is an atomic number
        url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/element/atomicnumber/${input}/JSON`;
    } else {
        // Input is an element name or symbol
        url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/element/name/${encodeURIComponent(input)}/JSON`;
    }

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.Table && data.Table.Row && data.Table.Row.length > 0) {
            const element = data.Table.Row[0].Cell;
            const elementDetails = {
                name: element[0].Value,
                symbol: element[1].Value,
                atomicNumber: element[2].Value,
                atomicMass: element[3].Value
            };
            resultDiv.innerHTML = `
                <h2>${elementDetails.name} (${elementDetails.symbol})</h2>
                <p>Atomic Number: ${elementDetails.atomicNumber}</p>
                <p>Atomic Mass: ${elementDetails.atomicMass}</p>
            `;
        } else {
            resultDiv.innerHTML = `<p>No element found with the name or symbol "${input}"</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        console.error('Error fetching data:', error);
    }
}
