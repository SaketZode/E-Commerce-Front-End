import React, { useEffect } from "react"
import { Carousel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { GetTopProducts } from "../actions/ProductListActions"
import Loader from "./Loader"
import Message from "./Message"

function ProductCarousel() {
	const dispatch = useDispatch()

	const topProducts = useSelector((state) => state.topProducts)
	const { error, loading, products } = topProducts

	useEffect(() => {
		dispatch(GetTopProducts())
	}, [dispatch])

	return (
		<Carousel>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				products.map((product) => (
					<Carousel.Item interval={1000} style={{ height: 250, backgroundColor: "rgb(0, 38, 51)", alignItems: "center" }}>
						<img src={`${product.image}`} alt={product.name} style={{ width: "100%" }} />
						<Carousel.Caption>
							<h3>{product.name}</h3>
						</Carousel.Caption>
					</Carousel.Item>
				))
			)}
		</Carousel>
	)
}

export default ProductCarousel
