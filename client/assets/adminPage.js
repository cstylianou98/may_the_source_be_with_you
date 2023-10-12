//page to display volunteering info from volunteers database

const countrysideBtn = document.getElementById("countryside")
const recyclingBtn = document.getElementById("recycling")
const skillsBtn = document.getElementById("skills")
const libraryBtn = document.getElementById("library")
const clearData = document.getElementById("clear")

const volunteeringTypes = ["Countryside", "Recycling", "Skills", "Library"]
const table = document.getElementById('dataTable');
const dataContainer = document.getElementById('data-container')

const displayTables = async (volunteeringType) => {
    // Fetching the route
    const response = await fetch(`http://localhost:3000/volunteer/event/${volunteeringType}`)

    // Parsing the json response
    const data = await response.json()

    // Upon successful volunteering GET request display details 

    if(response.status === 200){
        table.style.display = 'table';
        dataContainer.innerHTML = ''; //This is to clear any previous data

        data.forEach(item => {
            const row = document.createElement('tr');
            const properties = ['name', 'email', 'contact_info', 'address'];

            properties.forEach(propName => {
                const columnName = document.createElement('td');
                columnName.textContent = item[propName];
                row.appendChild(columnName);
            });

            dataContainer.appendChild(row);
        });
    } else {
        // Handle errors here
        console.error('Error:', response.status);
        const dataContainer = document.getElementById('data-container')
        dataContainer.innerHTML = 'No volunteers in database found' 
    }
}

volunteeringTypes.forEach(volunteeringType => {
    const button = document.getElementById(volunteeringType.toLowerCase());
    button.addEventListener ("click", () => {
        displayTables(volunteeringType)
    })
})

clearData.addEventListener("click", () => {
    table.style.display = 'none';
    dataContainer.innerHTML = '';
})




