import * as $ from 'jquery'
import Post from '@models/Post'
// import json from './assets/data'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
import logo from '@/assets/logo'
import React from 'react'
import { render } from 'react-dom'
import '@/babel'
import '@/styles/style.css'
import '@/styles/style.less'
import '@/styles/style.scss'

const post = new Post('Webpack Post Title', logo)

console.log('Post => ', post)

$("h1").addClass('title').text('jQuery')

const App = () => (
    <div className="container">
        <h1>Webpack</h1>

        <p>Roboto Font Family</p>

        <div className="logo" />

        <div className="box">
            <h2>Less</h2>
        </div>

        <div className="card">
            <h2>Sass</h2>
        </div>
    </div>
)

render(<App />, document.getElementById('app'))

// console.log('JSON => ', json)

// console.log('XML => ', xml)

// console.log('CSV => ', csv)
