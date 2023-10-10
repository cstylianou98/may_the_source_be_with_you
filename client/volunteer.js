// Getting the buttons

const countrysideBtn = document.getElementById("countryside")
const recyclingBtn = document.getElementById("recycling")
const skillsBtn = document.getElementById("skills")
const libraryBtn = document.getElementById("library")

// Getting the div sections 

const countrysideInfo = document.querySelector(".countryside")
const recyclingInfo = document.querySelector(".recycling")
const skillsInfo = document.querySelector(".skills")
const libraryInfo = document.querySelector(".library")

// Getting the header of the form 

const formHeader = document.querySelector(".volunteering-type")
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
    welcome.classList.add("disappear")

    formHeader.innerText = "Volunteer for Countryside Maintanence"
})

recyclingBtn.addEventListener("click", () => {

    recyclingInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    countrysideInfo.classList.add("disappear")
    skillsInfo.classList.add("disappear")
    libraryInfo.classList.add("disappear")
    welcome.classList.add("disappear")

    formHeader.innerText = "Volunteer for Recycling Management & Education"
})

skillsBtn.addEventListener("click", () => {

    skillsInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    recyclingInfo.classList.add("disappear")
    countrysideInfo.classList.add("disappear")
    libraryInfo.classList.add("disappear")
    welcome.classList.add("disappear")

    welcome.classList.add("disappear")
    formHeader.innerText = "Volunteer for Skills Sharing"
})

libraryBtn.addEventListener("click", () => {

    libraryInfo.classList.remove("disappear")
    form.classList.remove("disappear")

    recyclingInfo.classList.add("disappear")
    skillsInfo.classList.add("disappear")
    countrysideInfo.classList.add("disappear")
    welcome.classList.add("disappear")

    formHeader.innerText = "Volunteer as a Library Staff Member"
})


// Volunteering Form

$(document).ready(function(){
    $('#birth-date').mask('00/00/0000');
    $('#phone-number').mask('00000000000');
   })