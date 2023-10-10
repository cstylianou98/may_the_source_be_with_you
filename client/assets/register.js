document.getElementById("signup-form").addEventListener("submit", async(e) => {

    e.preventDefault();

    // const username = document.getElementById("signup-username")
    // const password = document.getElementById("signup-password")

    // console.log(username.value + password.value)


    const form = new FormData(e.target)

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/register", options);
    console.log(response)
    
    console.log("Exits fetch statement")

    const data = await response.json();

    if (response.status == 201){
        // localStorage.setItem("token", data.token)
        // console.log(data.token)
        // window.location.assign("homePage.html")
        window.location.assign("index.html")
    } else {
        alert(data.error)
    }

})