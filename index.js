const { doesNotMatch } = require("assert");
let http = require("http");
let morgan = require("morgan")

let logger = morgan('tiny')

http.createServer((request, response) => {
    logger(request, response, function (err) {
        if(err) return doesNotMatch(err)

        if(request.url === "/") {
            response.setHeader("Content-Type", "text/html; charset=utf-8")
            response.write("<h1>Pagina de Home</h1>")
            response.end()
        } else if(request.url === "/contacto") {
            response.setHeader("Content-Type", "text/html; charset=utf-8")
            response.write("<h1>Pagina de contacto</h1>")
            response.end()
        } else {
            response.setHeader("Content-Type", "text/html; charset=utf-8")
            response.write("<h1>404</h1>")
            response.end()
        }
    })
}).listen(8080);