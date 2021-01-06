let http = require("http");
let fs = require("fs")
let morgan = require("morgan")

let logger = morgan('tiny')

function fsFn(path, response) {
    fs.readFile(path, (error, content) => {
        if(!error) {
            response.write(content)
            response.end()
        }
    })
}

http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/html; charset=utf-8")
    logger(request, response, function (err) {
        if(err) return doesNotMatch(err)

        switch (request.url) {
            case "/": 
                fsFn('./index.html', response)
                break
            case "/about": 
                fsFn('./about.html', response)
                break
            case "/projects": 
                fsFn('./projects.html', response)
                break
            case "/contact": 
                fsFn('./contact.html', response)
                break
            case "/favicon.ico": 
            response.setHeader("Content-Type", "image/x-icon; charset=utf-8")
                fsFn('./favicon.ico', response)
                break
            default:
                fsFn('./404.html', response)
        }

    })
}).listen(8080);