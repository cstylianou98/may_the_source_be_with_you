// Getting the buttons

const countrysideBtn = document.getElementById("countryside")
const recyclingBtn = document.getElementById("recycling")
const skillsBtn = document.getElementById("skills")
const libraryBtn = document.getElementById("library")

const btnArray = [countrysideBtn, recyclingBtn, skillsBtn, libraryBtn]

// Getting the div sections 

const countrysideInfo = document.querySelector(".countryside")
const recyclingInfo = document.querySelector(".recycling")
const skillsInfo = document.querySelector(".skills")
const libraryInfo = document.querySelector(".library")

// Getting the header of the form 

const formHeader = document.querySelector(".volunteering-type")
const formInfo = document.querySelector(".volunteering-info")
const form = document.querySelector(".registration-form")
const welcome = document.querySelector(".welcome")

const infoArray = [countrysideInfo, recyclingInfo, skillsInfo, libraryInfo]

// Creating the event listeners

countrysideBtn.addEventListener("click", () => {

    countrysideInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    recyclingInfo.classList.add("disappear")
    skillsInfo.classList.add("disappear")
    libraryInfo.classList.add("disappear")

    formHeader.innerText = "Countryside"
    formInfo.innerText = "Volunteer for countryside maintanence"

    for (const btn of btnArray) {
        if (btn !== countrysideBtn) {
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
        }
      }
})



recyclingBtn.addEventListener("click", () => {

    recyclingInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    countrysideInfo.classList.add("disappear")
    skillsInfo.classList.add("disappear")
    libraryInfo.classList.add("disappear")

    formHeader.innerText = "Recycling"
    formInfo.innerText = "Volunteer for recycling management and education"

    for (const btn of btnArray) {
        if (btn !== recyclingBtn) {
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
        }
      }
})

skillsBtn.addEventListener("click", () => {

    skillsInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    recyclingInfo.classList.add("disappear")
    countrysideInfo.classList.add("disappear")
    libraryInfo.classList.add("disappear")

    formHeader.innerText = "Skills"
    formInfo.innerText = "Volunteer for skills sharing"

    for (const btn of btnArray) {
        if (btn !== skillsBtn) {
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
        }
      }
})

libraryBtn.addEventListener("click", () => {

    libraryInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    recyclingInfo.classList.add("disappear")
    skillsInfo.classList.add("disappear")
    countrysideInfo.classList.add("disappear")

    formHeader.innerText = "Library"
    formInfo.innerText = "Volunteer as a library staff member"

    for (const btn of btnArray) {
        if (btn !== libraryBtn) {
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
        }
      }
})



// Volunteering Form

    // Accessing the form

    const volunteeringForm = document.getElementById("volunteering-form")

    // Defining the submit form function

const submitForm = async (e) => {
        e.preventDefault()
    
    // Access the inputs
    const volunteeringType = formHeader.innerText
    const completionMessage = document.getElementById("volunteering-complete")
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const contactInfo = document.getElementById("phone-number")
    const address = document.getElementById("address")

    //  Defining the options for the Fetch API
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users_id: localStorage.token,
            name: name.value,
            email: email.value,
            contact_info: contactInfo.value,
            address: address.value,
        })
    }

    // Fetching the route
    const response = await fetch(`http://localhost:3000/volunteer/event/${volunteeringType}`, options)

    // Parsing the json response
    const data = await response.json()

    // Upon successful volunteering request display success message 

    if(response.status === 201){
        completionMessage.innerText = data.message
        name.innerText=""
        email.innerText=""
        contactInfo.innerText=""
        address.innerText=""
    }else{
        // Test for now
        alert("Error submitting form")
    }
    

}

// Adding event listener to the form 

form.addEventListener("submit", (e) => {
    submitForm(e)
})