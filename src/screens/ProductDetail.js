import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import products from '../products'
import Ratings from '../components/Ratings'
import styled from 'styled-components'

function ProductDetail({ match }) {
    const prod = products.find((p) => p._id === match.params.id)
    return (
        <Container>
            <Row>
                <Link to='/' className='btn btn-outline-primary'>GO BACK</Link>
            </Row>
            <ProductDetailContainer>
            <Row>
                <Col sm={6}>
                    <Image src={prod.image} alt={prod.name} fluid />
                </Col>
                <Col sm={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{prod.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings rating={prod.rating} reviews={prod.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{prod.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <strong>Price: {prod.price}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>
                                Status: {prod.countInStock>0 ? 'In Stock' : 'Out of stock!!'}
                            </strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block'>ADD TO CART</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </ProductDetailContainer>
        </Container>
    )
}

export default ProductDetail

const ProductDetailContainer = styled.div `
    margin: 20px;
    min-height: 490px;
`
