import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeliverOrder, getOrderDetails, PaymentAction } from "../actions/OrderActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import styled from "styled-components"
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap"
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from "react-router-dom"
import { ORDER_CREATE_RESET, ORDER_DELIVERY_RESET, ORDER_DETAILS_RESET, ORDER_PAY_RESET } from "../constants/OrderConstants"

/* PayPal Client ID :: AeXw5Ib91cKwHrz7QpNnu7L785WtAUA0MqG0E4mNKNSGEJuJdSkL4G_FfoU-3QhD5nUgbWRXNyoK0lb8 */

function OrderDetails({ match, history }) {
	const dispatch = useDispatch()

	const orderId = match.params.id

	const [sdkReady, setsdkReady] = useState(false)

	const orderDetailReducer = useSelector((state) => state.orderDetail)
	const { error, loading, orderDetails } = orderDetailReducer

	const userReducer = useSelector((state) => state.userReducer)
	const { user } = userReducer

	const payment = useSelector((state) => state.paymentStatus)
	const { loading: paymentLoading, paymentDetail, error: paymentError } = payment

	const orderDelivery = useSelector((state) => state.orderDelivery)
	const { loading: deliveryLoading, error: deliveryError, deliveryStatus, orderDetails: deliverOrderDetails } = orderDelivery

	const addPayPalScript = () => {
		const script = document.createElement("script")
		script.type = "text/javascript"
		script.src = "https://www.paypal.com/sdk/js?client-id=AeXw5Ib91cKwHrz7QpNnu7L785WtAUA0MqG0E4mNKNSGEJuJdSkL4G_FfoU-3QhD5nUgbWRXNyoK0lb8"
		script.async = true
		script.onload = () => {
			setsdkReady(true)
		}
		document.body.appendChild(script)
	}

	useEffect(() => {
		console.log("useEffect call for order details")
		if (deliveryStatus) {
			dispatch({
				type: ORDER_DELIVERY_RESET,
			})
			dispatch(getOrderDetails(orderId))
		}
		if (!orderDetails || orderDetails.id !== Number(orderId)) {
			console.log("order details is null. Fetching details")
			dispatch({
				type: ORDER_PAY_RESET,
			})
			dispatch({
				type: ORDER_CREATE_RESET,
			})
			dispatch(getOrderDetails(orderId))
		} /*else if(!orderDetails.isPaid) {
            console.log('payment pending')
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setsdkReady(true)
            }
        }*/
	}, [dispatch, orderId, paymentDetail, orderDetails, deliveryStatus])

	const successPaymentHandler = (paymentResult) => {
		dispatch(PaymentAction(orderId, paymentResult))
		dispatch(getOrderDetails(orderId))
		dispatch({
			type: ORDER_PAY_RESET,
		})
	}

	const continueShopping = (e) => {
		e.preventDefault()
		dispatch({
			type: ORDER_DETAILS_RESET,
		})
		history.push("/")
	}

	const deliverOrder = (e) => {
		e.preventDefault()
		dispatch(DeliverOrder(orderId))
	}

	return (
		<OrderDetailsContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div>
					<h2>Order Details</h2>
					<hr />
					<Row>
						<Col md={8}>
							<ListGroup>
								<ListGroup.Item>
									<h4>Shipping Address</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									{orderDetails.shippingAddress.address}, <br />
									{orderDetails.shippingAddress.city} - {orderDetails.shippingAddress.postalCode} <br />
									{orderDetails.shippingAddress.country}
								</ListGroup.Item>
							</ListGroup>

							<ListGroup>
								<ListGroup.Item>
									<h4>Order Items</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<ListGroup>
										{orderDetails.orderItems.map((item) => (
											<ListGroup.Item key={item.id}>
												<Row>
													<Col md={1}>
														<Image src={item.image} alt={item.name} fluid rounded />
													</Col>
													<Col md={5}>
														<Link to={`/productdetail/${item.product}`}>{item.name}</Link>
													</Col>
													<Col md={3}>{item.quantity}</Col>
													<Col md={3}>{item.price}</Col>
												</Row>
											</ListGroup.Item>
										))}
									</ListGroup>
								</ListGroup.Item>
							</ListGroup>

							<ListGroup>
								<ListGroup.Item>
									<h4>Payment Details</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Payment Method: </strong>
									{orderDetails.paymentMethod}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Payment Status: </strong>
									{orderDetails.isPaid ? "Payment successfully completed on " + orderDetails.paidAt.substring(0, 10) : "Pending"}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Delivery Status: </strong>
									{orderDetails.isDelivered ? "Delivered on " + orderDetails.deliveredAt.substring(0, 10) : "Pending"}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<ListGroup>
								<ListGroup.Item>
									<h4>Shopping Summary</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>
											<strong>Items Price:</strong>
										</Col>

										<Col md={6}>{orderDetails.totalPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>
											<strong>Shipping Charges:</strong>
										</Col>
										<Col md={6}>{orderDetails.shippingPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>
											<strong>Tax Price:</strong>
										</Col>
										<Col md={6}>{orderDetails.taxPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>
											<strong>Grand Total:</strong>
										</Col>
										<Col md={6}>
											<strong>{Number(orderDetails.taxPrice) + Number(orderDetails.shippingPrice) + Number(orderDetails.totalPrice)}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{paymentError ? (
									<ListGroup>
										<ListGroup.Item>
											<Message variant="danger">{paymentError.detail}</Message>
										</ListGroup.Item>
									</ListGroup>
								) : paymentDetail ? (
									<ListGroup>
										<ListGroup.Item>
											<Message variant="info">{paymentDetail.detail}</Message>
										</ListGroup.Item>
										<ListGroup.Item>
											<Button className="btn-block" onClick={continueShopping}>
												Continue Shopping
											</Button>
										</ListGroup.Item>
									</ListGroup>
								) : !orderDetails.isPaid && !user.isAdmin ? (
									<ListGroup>
										<ListGroup.Item>
											{!window.paypal ? (
												addPayPalScript()
											) : paymentLoading ? (
												<Loader />
											) : !sdkReady ? (
												setsdkReady(true)
											) : (
												<PayPalButton
													amount={Number(orderDetails.taxPrice) + Number(orderDetails.shippingPrice) + Number(orderDetails.totalPrice)}
													onSuccess={successPaymentHandler}
												/>
											)}
										</ListGroup.Item>
									</ListGroup>
								) : deliveryError ? (
									<Message variant="danger">{deliveryError}</Message>
								) : deliveryLoading ? (
									<Loader />
								) : (
									user.isAdmin &&
									!orderDetails.isDelivered && (
										<ListGroup>
											<ListGroup.Item>
												<Button disabled={orderDetails.isDelivered || !orderDetails.isPaid} onClick={deliverOrder} className="btn btn-block">
													Deliver
												</Button>
											</ListGroup.Item>
										</ListGroup>
									)
								)}
							</ListGroup>
						</Col>
					</Row>
				</div>
			)}
		</OrderDetailsContainer>
	)
}

export default OrderDetails

const OrderDetailsContainer = styled.div`
	margin: 30px;
`
