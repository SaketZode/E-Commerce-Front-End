import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import {React, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Ratings from "../components/Ratings"
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/ProductListActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductDetail({ match }) {
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetailsReducer)
    const { error, loading, product } = productDetail

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])
    
    return (
        <Container>
            <Row>
                <Link to='/' className='btn btn-outline-primary'>GO BACK</Link>
            </Row>
            <ProductDetailContainer>
                {
                    loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                    :
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
                }
            
            </ProductDetailContainer>
        </Container>
    )
}

export default ProductDetail

const ProductDetailContainer = styled.div `
    margin: 20px;
    min-height: 490px;
`
