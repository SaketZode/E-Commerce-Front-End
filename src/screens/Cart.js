import React, { useEffect } from 'react'
import { Alert, Button, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/CartActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components'

function Cart({match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartReducer)
    const {error, loading, cartItems} = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Container>
            <h1>SHOPPING CART</h1>
            <hr />
            
            <CartContainer>
                <Row>
                    <Link to='/' className='btn btn-outline-primary'>CONTINUE SHOPPING</Link>
                </Row>
                <CartItemsContainer>
                {
                    loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message>
                    :   
                    <Row>
                        <Col md={8}>
                            {
                                cartItems.length === 0 ? 
                                <Message variant='info'>
                                    Woww!! So empty '_'<br/><Alert.Link href='/'>GO BACK</Alert.Link>
                                </Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {
                                            cartItems.map(item => (
                                                <ListGroup.Item key={item.product}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col md={3}>
                                                            <Link to={`/products/${item.product}`} style={{textDecoration: 'none'}}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={2}>
                                                            &#8377; {item.price}
                                                        </Col>
                                                        <Col md={2}>
                                                            <Form.Control
                                                            as="select"
                                                            value={item.qty}
                                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                            >
                                                                {
                                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                                        <option value={x+1} key={x+1}>
                                                                            {x+1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                        <Col md={1}>
                                                            <Button 
                                                            style={
                                                                {
                                                                    color: 'red',
                                                                    background: 'none',
                                                                    border: 'none'
                                                                }
                                                            }
                                                            onClick={() => removeFromCartHandler(item.product)}>
                                                                <i><DeleteIcon /></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </Col>

                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>SUB-TOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS</h2>
                                    <strong>&#8377; {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' disabled={cartItems.length === 0}>
                                        PROCEED TO CHECKOUT
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                }
                </CartItemsContainer>
            </CartContainer>
        </Container>
    )
}

export default Cart

const CartContainer = styled.div `
    margin: 20px;
`

const CartItemsContainer = styled.div `
    margin: 20px 0px;
`
