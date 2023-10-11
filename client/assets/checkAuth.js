async function auth() {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/", options);

    if(response.status != 200){
        window.location.assign("index.html")
    }
}

auth()