import React from 'react'
import './Article.css'

const Article = ({ article }) => (
    <div className="article">
        <h3>{article.title}</h3>
        <p>{article.body}</p>
    </div>
)

export default Article