#!/usr/bin/env node

const fs = require('fs-extra')
const path = equire('path')
const https = require('https')
const {
    exec
} = require('child_process')

const packageJson = require('../package.json')

const scripts = `"start": "webpack-dev-server == port 8080 --open --mode=development --display-error-details",
    "clean-build": "npm run clean-build && webpack --mode=production",
    "build": "npm run clean-build && webpack --mode=production",
    "build-serve": "npm run build && serve"`

const babel = `"babel": ${JSON.stringify(packageJson.babel)}`

const husky = `"husky": ${JSON.stringify(packageJson.husky)}`

const lint_staged = `"lint-staged": ${JSON.stringify(packageJson['lint-staged'])}`

const node_engine = `"node_engine": ${JSON.stringify(packageJson.engines)}`

const getDeps = deps =>
    Object.entries(deps)
    .map(dep => `${dep[0]}@${dep[1]}`)
    .toString()
    .replace(/,/g, ' ')
    .replace(/^/g, '')
    .replace(/fs-extra[^\s]+/g, '')

console.log('init...')

// create folder and init npm 
exec(
    `mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
    (initEr, initStdout, initStderr) => {
        if (initEr) {
            console.log(initEr)
            return;
        }
        const packageJSON = `${process.argv[2]}/package.json`
        fs.readFile(packageJSON, (er, file) => {
            if (er) throw er 
            const data = file 
                .toString()
                .replace(`"test": "echo 'Error: no test specified' && exit 1"`, scripts) 
                .replace(`"keywords": []`, `${node_engine}, ${babel}, ${husky}, ${lint_staged}`) 
                fs.writeFile(packageJSON, data, er => er || true) 
        }) 

        const files = [
            'README.md', 
            'webpack.config.js', 
            '.eslintrc', 
            '_redirects', 
            '.prettierrc', 
            'index.html', 
            'serve.json', 
            'favicon.png'
        ]

        for (let i = 0; i < files.length; i++) {
            fs.createReadStream(path.join(__dirname, `../${files[i]}`))
                .pipe(fs.createWriteStream(`${process.argv[2]}/${files[i]}`))
        }

        https.get(
            'https://raw.githubusercontent.com/Nikhil-Kumaran/reactjs-boilerplate/master/.gitignore', 
            res => {
                res.setEncoding('utf-8') 
                let body = '' 
                res.on('data', data => body += data) 
                res.on('end', () => {
                    fs.writeFile(`${process.argv[2]}/.gitignore`, body, { encoding: 'utf-8' }, er => {
                        if (er) throw er 
                    }) 
                }) 
            } 
        ) 

        console.log('npm init -- done\n') 

        console.log('install deps') 
        const devDeps = getDeps(packageJSON.devDependencies) 
        const deps = getDeps(packageJSON.dependencies)
        exec(
            `cd ${process.argv[2]} && git init && node -v && npm -v && npm i -D ${devDeps} && npm i ${deps}`, 
            (npmEr, npmStdout, npmStdin) => {
                if (npmEr) {
                    console.log(npmEr) 
                    return;
                }

                console.log(npmStdout) 
                console.log('done') 

                console.log('copy') 
                fs.copy(path.join(__dirname, '../src'), `${process.argv[2]}/src`) 
                    .then(() => console.log(`ready. use\ncd ${process.argv[2]}\nnpmstart\nto run the app`))
                    .catch(er => console.log(er))
            } 
        )
    } 
) 