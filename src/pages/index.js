import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"
import styled from 'styled-components';

import * as palette from '../utils/styles';

import Header from '../components/Header';
import MiniBio from '../components/MiniBio';

const Wrapper = styled.div`

`;

const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(25vw, 1fr) );
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
`;

const Card = styled(Link)`
    height: 90vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: left;
    justify-content: top;
    flex-direction: column;
    text-shadow: 0px 0px 1px ${palette.BG_COLOR };
`;

const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    div {
        overflow: hidden;
    }
`;

const Data = styled.div`
    padding: 1rem;
    z-index: 10;
    opacity: 1;
`;

const CardContent = styled.div`
    padding: 1rem;
    position: relative;
    opacity: 1;
`;

const Name = styled.h1`
    text-transform: uppercase;
`;

const Post = ({node}) => {
    return (
        <GridItem>
          <Card to={node.slug} >
              <Cover>
                <Img resolutions={node.featuredImage.resolutions}/>
              </Cover>
              <Data>
                <CardContent>
                  <Name>{node.title}</Name>
                </CardContent>
              </Data>
            </Card>
        </GridItem>
    )
}


const IndexPage = (props) => {

    console.log(props)
    return (
      <wrapper>
      <Header />
      <MiniBio />
        <Grid>
            {props.data.allContentfulBlog.edges.map((edge) => <Post key={edge.node.id} node={edge.node} />)}
        </Grid>
      </wrapper>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query pageQuery {
        allContentfulBlog(
            filter: {
                node_locale: {eq: "en-US"}
            },
            sort: {
                fields: [createdAt], order: DESC
            }
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    createdAt(formatString: "MMMM DD, YYYY")
                    featuredImage {
                        resolutions(width: 740) {
                            ...GatsbyContentfulResolutions_withWebp
                        }
                    }
                    content {
                        childMarkdownRemark {
                            excerpt
                        }
                    }
                }
            }
        }
    }
`
