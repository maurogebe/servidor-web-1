let express = require("express")
let path = require("path")

let app = express()

app.use(express.static("public"))
app.use(express.static("assets"))
app.use(express.urlencoded({extended: false}))

app.listen(8080, () => {
    console.log("Servidor corriendo")
})

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"))
})

app.get("/about", (request, response) => {
    response.sendFile(path.join(__dirname, "about.html"))
})

app.get("/contact", (request, response) => {
    response.sendFile(path.join(__dirname, "contact.html"))
})

app.use((request, response) => {
    response.sendFile(path.join(__dirname, "404.html"))
})

app.post("/users", (request, response) => {
    console.log(request.body)
    response.redirect("/")
})