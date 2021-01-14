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

http.createServer((request, response) => {
    logger(request, response, function (err) {
        if(err) return doesNotMatch(err)

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
            let users = []

            // Cuando se estan recibiendo los datos
            request.on('users', chunk => {
                users.push(chunk)
            })

            // Cuando se terminan de procesar los datos
            request.on('end', () => {
                console.log(users.toString)
                console.log("The End")
            })
        }
        
    })
}).listen(8080);