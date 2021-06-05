import React, { useEffect } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { createOrderAction } from '../actions/OrderActions'
import Message from '../components/Message'
import { ORDER_CREATE_RESET } from '../constants/OrderConstants'

function PlaceOrder() {
    const dispatch = useDispatch()
    
    const orderCreate = useSelector(state => state.order)
    const  { orderDetails, error, loading, success } = orderCreate

    const cart = useSelector(state => state.cartReducer)
    
    const history = useHistory()

    cart.amount = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.tax = (0.05 * cart.amount).toFixed(2)
    cart.shippingCharges = cart.amount > 500 ? 0 : 50
    cart.total = (Number(cart.amount) + Number(cart.shippingCharges) + Number(cart.tax)).toFixed(2)

    useEffect(() => {
        if (success) {
            history.push(`/orderdetails/${orderDetails.id}`)
        }
    }, [success, history, orderDetails])

    const placeOrder = (e) => {
        e.preventDefault()
        dispatch({
            type: ORDER_CREATE_RESET
        })
        dispatch(createOrderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            total: Number(cart.amount),
            tax: Number(cart.tax),
            shippingPrice: Number(cart.shippingCharges)
        }))
    }

    return (
        <OrderConfirmationContainer>
            <h1>Order Confirmation</h1>
            <hr />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Shipping to</h4>
                            <p>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} - {cart.shippingAddress.zipcode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            <ListGroup>
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={6}>
                                                <Link to={`/productdetail/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                &#8377; {item.price} 
                                            </Col>
                                            <Col md={1}>
                                                {item.qty}
                                            </Col>
                                            <Col md={2}>
                                                {(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <h3>Summary</h3>
                    <hr />
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Amount</Col>
                                <Col md={6}>&#8377; {cart.amount}</Col>
                            </Row>
                            <Row>
                                <Col md={6}>Shipping charges</Col>
                                <Col md={6}>&#8377; {cart.shippingCharges}</Col>
                            </Row>
                            <Row>
                                <Col md={6}>Tax</Col>
                                <Col md={6}>&#8377; {cart.tax}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}><strong>Total:</strong></Col>
                                <Col md={6}><strong>&#8377; {cart.total}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                    </ListGroup>
                    <Button type='button' variant='primary' onClick={placeOrder} className='btn-block'>Place Order</Button>
                </Col>
            </Row>
        </OrderConfirmationContainer>
    )
}

export default PlaceOrder

const OrderConfirmationContainer = styled.div `
    margin: 30px;
`
