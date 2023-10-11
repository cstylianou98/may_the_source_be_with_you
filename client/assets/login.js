document.getElementById("login-form").addEventListener("submit", async(e) => {

    e.preventDefault();



    const form = new FormData(e.target)

    const isAdminBoxChecked = form.get("adminCheck") 

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
    if(isAdminBoxChecked === "on"){
        const response = await fetch("http://localhost:3000/admin", options);
        const data = await response.json();

        if (response.status == 200){
            localStorage.setItem("token", data.token)
            console.log(data.token)
            window.location.assign("adminPage.html")
        } else {
            alert(data.error)
        }

    } else {
        const response = await fetch("http://localhost:3000/login", options);
        const data = await response.json();

        if (response.status == 200){
            localStorage.setItem("token", data.token)
            console.log(data.token)
            window.location.assign("homePage.html")
        } else {
            alert(data.error)
        }
    }

})

