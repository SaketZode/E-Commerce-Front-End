import { React, useEffect } from "react"
import { Col, Row, Container, Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/ProductListActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import Product from "../components/Product"
import ProductCarousel from "../components/ProductCarousel"

function ProductList({ history }) {
	const dispatch = useDispatch()

	const queryParams = history.location.search
	const params = new URLSearchParams(queryParams)
	let pageNo = params.get("page")
	let searchkey = params.get("searchtext")

	const productList = useSelector((state) => state.productReducer)
	const { error, loading, products, next, previous, total_pages } = productList

	useEffect(() => {
		dispatch(listProducts(searchkey, pageNo))
	}, [dispatch, searchkey, pageNo])

	return (
		<div>
			<ProductCarousel />
			<Jumbotron>
				<h1>Products</h1>
				<hr />
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<div>
						<Row>
							{products.map((prod) => (
								<Col key={prod.id} sm={12} md={6} lg={4} xl={3}>
									<Product product={prod} />
								</Col>
							))}
						</Row>
					</div>
				)}
			</Jumbotron>
			<Row>
				<Paginate page={pageNo} pages={total_pages} keyword={searchkey} next={next} previous={previous} />
			</Row>
		</div>
	)
}

export default ProductList
