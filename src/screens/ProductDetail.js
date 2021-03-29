import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Ratings from "../components/Ratings"
import styled from 'styled-components'
import axios from 'axios'

function ProductDetail({ match }) {
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProduct()
    }, [match.params.id])
    return (
        <Container>
            <Row>
                <Link to='/' className='btn btn-outline-primary'>GO BACK</Link>
            </Row>
            <ProductDetailContainer>
            <Row>
                <Col sm={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col sm={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings ratings={product.rating} reviews={product.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <strong>Price: &#8377; {product.price}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>
                                Status: {product.countInStock>0 ? 'In Stock' : 'Out of stock!!'}
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
