let http = require("http");
let fs = require("fs")
let morgan = require("morgan")

let logger = morgan('tiny')

// const routes = ['/', '/about', '/projects', '/contact', '/404']

function fsFn(route, response) {
    fs.readFile(route, (error, content) => {
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

        if(request.url === "/") {
            fsFn('./index.html', response)
        } else if(request.url === "/about") {
            fsFn('./about.html', response)
        } else if(request.url === "/projects") {
            fsFn('./projects.html', response)
        } else if(request.url === "/contact") {
            fsFn('./contact.html', response)
        } else {
            fsFn('./404.html', response)
        }

        // switch (true) {
        //     case request.url === "/":
        //         // fs('./index.html')
        //         fs.readFile('./index.html', (error, content) => {
        //             if(!error) {
        //                 response.write(content)
        //                 response.end()
        //             }
        //         })
        //         break
        //     case request.url === "/about":
        //         fs('./about.html')
        //         break
        //     case request.url === "/projects":
        //         fs('./projects.html')
        //         break
        //     case request.url === "/contact":
        //         fs('./contact.html')
        //         break
        //     default:
        //         fs('./404.html')
        //         break
        // }
    })
}).listen(8080);