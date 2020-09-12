import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Article from '../components/article'

const IndexPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        {
          contentfulPerson {
            fullName
          }
          allContentfulArticle {
            edges {
              node {
                id
                title
                text {
                  text
                }
                publishedAt
              }
            }
          }
        }`}
      render={({
        allContentfulArticle: {
          edges
        }
      }) => (
        edges.map(({ node }) => (
          <Article key={node.id} content={node} />
        ))
      )}
    />
  </Layout>
)

export default IndexPage
