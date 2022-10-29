'use strict';
const express = require('express');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = express();
const rootPath = 'html_ja';
const fs = require('fs');
const basicAuth = require('express-basic-auth')


const servePages = function (req, res, next) {
    const htmlString = fs.readFileSync(rootPath + req.path, 'utf8');
    const dom = new JSDOM(htmlString);
    const bootstrapCSS = dom.window.document.createElement('link')
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css'
    bootstrapCSS.rel = "stylesheet"
    bootstrapCSS.crossOrigin = "anonymous"
    dom.window.document.getElementsByTagName('head')[0].appendChild(bootstrapCSS)
    const bootstrapJS = dom.window.document.createElement('script')
    bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js'
    bootstrapJS.crossOrigin = "anonymous"
    dom.window.document.body.appendChild(bootstrapJS)
    const navBar = `
    <nav class="navbar navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <div class="navbar-brand">Mastering Lightning Network > ${req.path.replace('/', '').replace('.html', '')} </div>
            <a class="navbar-brand" href="/">TOP</a>
        </div>
    </nav>    
    `;
    dom.window.document.body.insertAdjacentHTML('afterbegin', navBar)
    res.send(dom.window.document.documentElement.outerHTML)
    next()
}

const serveIndex = require('serve-index');

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
    realm: 'private web site',
}))
app.use(serveIndex(rootPath, {
    filter: (filename) => filename != 'images',
    icons: false,
    view: 'details'
}));
app.use(servePages)

app.listen(8002, () => {
    console.log('Express Server');
});