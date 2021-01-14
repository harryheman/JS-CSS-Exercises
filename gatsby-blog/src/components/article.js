import React from "react"

const Article = ({ content: { title, text, publishedAt } }) => (
  <div>
    <h2>{title}</h2>
    <p>{text.text}</p>
    <p>{publishedAt}</p>
  </div>
)

export default Article
