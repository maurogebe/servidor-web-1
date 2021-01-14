let http = require("http");
let fs = require("fs")
let morgan = require("morgan")
let path = require("path")
let mime = require("mime")

let logger = morgan('tiny')

const fsFn = (url, response) => {
    const urlF = __dirname + url
    fs.readFile(urlF, (error, content) => {
        if(!error) {
            response.setHeader("Content-Type", mime.getType(urlF))
            response.end(content)
        } else {
            response.statusCode = 404
            response.writeHead(404)
            response.end('<h1>405</h1>')
        }
    })
}

const addUser = (request) => {
    switch (request.url) {
        case "/users": 
            let data = ''
            // Cuando se estan recibiendo los datos
            request.on('data', chunk => {
                data += chunk
            })
            // Cuando se terminan de procesar los datos
            request.on('end', () => {
                let datos = data.toString()
                // user.split('&')
                let user = {
                    firstName: datos.split("&")[0].split("=")[1],
                    lastName: datos.split("&")[1].split("=")[1],
                    email: datos.split("&")[2].split("=")[1],
                    password: datos.split("&")[3].split("=")[1],
                }
                fs.writeFile("db_usuarios.txt", JSON.stringify(user), (error)=> {
                    if(error) {
                        console.log(error)
                    }
                })
                console.log(data.toString())
                console.log("The End")
            })
            break
        default:
            fsFn(request.url, response)
    }    
}

http.createServer((request, response) => {
    logger(request, response, function (err) {
        if(err) return doesNotMatch(err)
        // console.log(request.method)
        if(request.method === "GET") {
            switch (request.url) {
                case "/": 
                    fsFn('/index.html', response)
                    break
                case "/about": 
                    fsFn('/about.html', response)
                    break
                case "/projects": 
                    fsFn('/projects.html', response)
                    break
                case "/contact": 
                    fsFn('/contact.html', response)
                    break
                case "/favicon.ico": 
                    fsFn('/favicon.ico', response)
                    break
                default:
                    fsFn(request.url, response)
            }    
        } else if(request.method === "POST") {
            addUser(request)
        }
        
    })
}).listen(8080);