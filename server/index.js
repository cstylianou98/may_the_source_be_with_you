// ! Import dotenv 

require("dotenv").config()
const app = require("./app")
const port = process.env.PORT || 3000

// ! Activate server 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
