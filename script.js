document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading');
    const disclaimerModal = document.getElementById('disclaimerModal');
    const startButton = document.getElementById('startButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    
    disclaimerModal.style.display = 'flex';

    startButton.addEventListener('click', function() {
        
        disclaimerModal.style.display = 'none';
        
        backgroundMusic.play();
    });

    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000); 
});

let periodicTable = {};

fetch('periodic_table.json')
    .then(response => response.json())
    .then(data => {
        console.log('Data from JSON:', data);  

        periodicTable = data.reduce((acc, element) => {
            acc[element.Symbol.toLowerCase()] = element;
            acc[element.Name.toLowerCase()] = element;
            return acc;
        }, {});
        console.log('Processed data:', periodicTable);  
    })
    .catch(err => {
        console.error("Failed to load JSON file:", err);
    });

function searchElement() {
    const loadingContainer = document.getElementById('loading');
    const resultDiv = document.getElementById('elementDetails');

    loadingContainer.style.display = 'flex';
    resultDiv.innerHTML = ''; 

    const input = document.getElementById('searchInput').value.trim().toLowerCase();

    console.log('Search input:', input); 

    if (input === "") {
        resultDiv.innerHTML = "<p>Please enter an element name or symbol.</p>";
        setTimeout(() => {
            loadingContainer.style.display = 'none';
        }, 2000); 
        return;
    }

    console.log('PeriodicTable object:', periodicTable); 
    setTimeout(() => {
        const element = periodicTable[input];
        console.log('Element found:', element);  

        if (element) {
            resultDiv.innerHTML = `
                <h2>${element.Name} (${element.Symbol})</h2>
                <p>Atomic Number: ${element['Atomic Number']}</p>
                <p>Atomic Mass: ${element['Atomic Mass']}</p>
            `;
        } else {
            resultDiv.innerHTML = `<p>No element found with the name or symbol "${input}"</p>`;
        }

        loadingContainer.style.display = 'none';
    }, 2000); 
}
