document.getElementById("logout").addEventListener("click", async(e) => {
    e.preventDefault()

    const options = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.token
        })
    }

    const response = await fetch("http://localhost:3000/logout", options)
    console.log(response)

    if(response.status === 204){
        localStorage.removeItem("token")
        window.location.assign("index.html")
    }else{
        alert(response.statusText)
    }
})