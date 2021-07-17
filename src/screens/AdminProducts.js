import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, listProducts } from "../actions/ProductListActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import EditRoundedIcon from "@material-ui/icons/EditRounded"
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded"
import AddIcon from "@material-ui/icons/Add"
import { PRODUCT_DELETE_RESET } from "../constants/ProductListConstants"
import Paginate from "../components/Paginate"

function AdminProducts({ history }) {
	const dispatch = useDispatch()

	const queryParams = history.location.search
	const params = new URLSearchParams(queryParams)
	let pageNo = params.get("page")

	const productList = useSelector((state) => state.productReducer)
	const { error, loading, products, previous, next, total_pages } = productList

	const userReducer = useSelector((state) => state.userReducer)
	const { user } = userReducer

	const productDelete = useSelector((state) => state.productDelete)
	const { error: productDeleteError, success: productDeleteSuccess } = productDelete

	useEffect(() => {
		if (!user || !user.isAdmin) {
			history.push("/")
		} else if (productDeleteSuccess) {
			dispatch({
				type: PRODUCT_DELETE_RESET,
			})
			dispatch(listProducts("", pageNo))
		} else {
			dispatch(listProducts("", pageNo))
		}
	}, [dispatch, productDeleteSuccess, pageNo])

	const handleEditProduct = (id) => {
		history.push(`/admin/products/${id}/edit`)
	}

	const handleDeleteProduct = (id) => {
		dispatch(deleteProduct(id))
	}

	const handleAddProduct = () => {
		history.push("/admin/product/add")
	}

	return (
		<Container>
			<Row>
				<Col md={9}>
					<h1>Products</h1>
				</Col>
				<Col md={3}>
					<Button className="btn btn-block" onClick={handleAddProduct}>
						<AddIcon /> Create Product
					</Button>
				</Col>
			</Row>
			<hr />
			{productDeleteError && <Message variant="danger">{productDeleteError}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div>
					<Table striped responsive hover className="table" size="sm">
						<thead>
							<tr>
								<th>Product ID</th>
								<th>Product Name</th>
								<th>Product Price</th>
								<th>Brand</th>
								<th>Category</th>
								<th>Product Rating</th>
								<th>Stock</th>
								<th>Operations</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.brand}</td>
									<td>{product.category}</td>
									<td>{product.rating}</td>
									<td>{product.countInStock}</td>
									<td>
										<Button variant="primary" size="sm" onClick={() => handleEditProduct(product.id)}>
											<EditRoundedIcon />
										</Button>{" "}
										<Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
											<DeleteForeverRoundedIcon />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Row>
						<Paginate page={pageNo} pages={total_pages} next={next} previous={previous} uri="/admin/orders" />
					</Row>
				</div>
			)}
		</Container>
	)
}

export default AdminProducts
