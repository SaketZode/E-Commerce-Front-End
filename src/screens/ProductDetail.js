import { Button, Col, Container, Image, ListGroup, Row, Form } from "react-bootstrap"
import { React, useEffect, useState } from "react"
import Ratings from "../components/Ratings"
import { useDispatch, useSelector } from "react-redux"
import { CreateProductReview, listProductDetails } from "../actions/ProductListActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Rating from "@material-ui/lab/Rating"
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from "../constants/ProductListConstants"

function ProductDetail({ match, history }) {
	const productId = match.params.id

	const [qty, setQty] = useState(1)
	const [productrating, setproductrating] = useState(0)
	const [comment, setcomment] = useState("")
	const [title, settitle] = useState("")

	const dispatch = useDispatch()

	const productDetail = useSelector((state) => state.productDetailsReducer)
	const { error, loading, product } = productDetail

	const userLogin = useSelector((state) => state.userReducer)
	const { user } = userLogin

	const productReview = useSelector((state) => state.productReview)
	const { loading: reviewLoading, success: reviewSuccess, review: submitReview, error: reviewError } = productReview

	useEffect(() => {
		if (!product || product.id !== Number(productId) || reviewSuccess) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_RESET,
			})
			dispatch(listProductDetails(productId))
		}
	}, [dispatch, match, productId, product, reviewSuccess])

	const addToCartHandler = () => {
		history.push(`/cart/${productId}?qty=${qty}`)
	}

	const submitReviewHandler = () => {
		dispatch(CreateProductReview(productId, { rating: Number(productrating), name: title, comment: comment }))
	}

	const goBack = (e) => {
		e.preventDefault()
		dispatch({
			type: PRODUCT_DETAILS_RESET,
		})
		dispatch({
			type: PRODUCT_CREATE_REVIEW_RESET,
		})
		history.push("/")
	}

	return (
		<div>
			<ListGroup>
				<ListGroup.Item>
					<Button onClick={goBack} className="btn btn-primary">
						GO BACK
					</Button>
				</ListGroup.Item>
				<ListGroup.Item>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant="danger">{error}</Message>
					) : (
						<div>
							<Row>
								<Col sm={6}>
									<Image src={product.image} alt={product.name} fluid borderradius={100} />
								</Col>
								<Col sm={3}>
									<ListGroup>
										<ListGroup.Item>
											<h3>{product.name}</h3>
										</ListGroup.Item>
										<ListGroup.Item>
											<strong>Category:</strong>
											<p>{product.category}</p>
										</ListGroup.Item>
										<ListGroup.Item>
											<strong>Reviews:</strong>
											<Ratings ratings={product.rating} reviews={product.numReviews} />
										</ListGroup.Item>
										<ListGroup.Item>
											<strong>Description:</strong>
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
											<strong>Status: {product.countInStock > 0 ? "In Stock" : "Out of stock!!"}</strong>
										</ListGroup.Item>
										<ListGroup.Item>
											{product.countInStock > 0 ? (
												<Row>
													<Col>
														<strong>Qty:</strong>
													</Col>
													<Col>
														<Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
															{[...Array(product.countInStock).keys()].map((x) => (
																<option value={x + 1} key={x + 1}>
																	{x + 1}
																</option>
															))}
														</Form.Control>
													</Col>
												</Row>
											) : (
												<Row>
													<strong>Sorry for the inconvenience..!!</strong>
												</Row>
											)}
										</ListGroup.Item>
										<ListGroup.Item>
											<Button onClick={addToCartHandler} className="btn-block" disabled={product.countInStock === 0}>
												ADD TO CART
											</Button>
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
							<ListGroup.Item>
								<Row>
									<Col md={6}>
										<h4>Product Reviews</h4>
										<hr />
										{product.productReviews.length === 0 ? (
											<h6>No reviews yet</h6>
										) : (
											<ListGroup>
												{product.productReviews.map((review) => (
													<ListGroup.Item key={review.id}>
														<strong>{review.name}</strong>
														<br />
														<Rating value={review.rating} precision={0.5} readOnly></Rating>
														<p>{review.comment}</p>
													</ListGroup.Item>
												))}
											</ListGroup>
										)}
									</Col>
									<Col md={6}>
										<h4>Write a review</h4>
										<hr />
										{reviewSuccess && <Message variant="info">{reviewSuccess}</Message>}
										{reviewLoading ? (
											<Loader />
										) : reviewError ? (
											<Message variant="danger">{reviewError}</Message>
										) : (
											<Form onSubmit={submitReviewHandler}>
												<fieldset disabled={user ? "" : "disabled"}>
													<ListGroup>
														<ListGroup.Item>
															<Rating
																precision={0.5}
																name="product-rating"
																value={productrating}
																onChange={(e) => setproductrating(Number(e.target.value))}
																disabled={user ? false : true}
															></Rating>
														</ListGroup.Item>
														<ListGroup.Item>
															<Form.Control type="text" value={title} placeholder="Title" onChange={(e) => settitle(e.target.value)}></Form.Control>
														</ListGroup.Item>
														<ListGroup.Item>
															<Form.Control as="textarea" value={comment} placeholder="Comment" onChange={(e) => setcomment(e.target.value)}></Form.Control>
														</ListGroup.Item>
														<ListGroup.Item>
															<Button type="submit">Post</Button>
														</ListGroup.Item>
													</ListGroup>
												</fieldset>
											</Form>
										)}
									</Col>
								</Row>
							</ListGroup.Item>
						</div>
					)}
				</ListGroup.Item>
			</ListGroup>
		</div>
	)
}

export default ProductDetail
