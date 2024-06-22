document.getElementById('searchButton').addEventListener('click', function() {
    const elementName = document.getElementById('searchInput').value.toLowerCase();
    fetchElementDetails(elementName);
});

async function fetchElementDetails(elementName) {
    console.log(`Searching for element: ${elementName}`);  // Debug log

    const url = `https://periodic-table-api.p.rapidapi.com/search?name=${elementName}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '96e1476da4msha3b6fd302117ea7p1cfe88jsnf36102d659d8',
            'x-rapidapi-host': 'periodic-table-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);  // Debug log
        if (!result.length) {
            throw new Error('Element not found');
        }
        displayElementDetails(result[0]);
    } catch (error) {
        console.error('Error fetching element details:', error);
        document.getElementById('elementDetails').innerHTML = '<p>Element not found. Please try again.</p>';
    }
}

function displayElementDetails(element) {
    const elementDetails = `
        <h2>${element.name} (${element.symbol})</h2>
        <p><strong>Atomic Number:</strong> ${element.atomicNumber}</p>
        <p><strong>Atomic Mass:</strong> ${element.atomicMass}</p>
        <p><strong>Category:</strong> ${element.groupBlock}</p>
        <p><strong>Appearance:</strong> ${element.appearance}</p>
        <p><strong>Density:</strong> ${element.density} g/cm³</p>
        <p><strong>Boil:</strong> ${element.boil} K</p>
        <p><strong>Melt:</strong> ${element.melt} K</p>
        <p><strong>Discovered By:</strong> ${element.discoveredBy}</p>
    `;
    document.getElementById('elementDetails').innerHTML = elementDetails;
}
