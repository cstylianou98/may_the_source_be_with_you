document.getElementById("login-form").addEventListener("submit", async(e) => {

    e.preventDefault();

    const username = document.getElementById("login-username")
    const password = document.getElementById("login-password")

    console.log(username.value + password.value)


    // const form = new FormData(e.target)
    // console.log(form)

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }

    const response = await fetch("http://localhost:3000/login", options);
    console.log(response)
    
    console.log("Exits fetch statement")

    const data = await response.json();

    if (response.status == 200){
        localStorage.setItem("token", data.token)
        console.log(data.token)
        window.location.assign("homePage.html")
    } else {
        alert(data.error)
    }

})

