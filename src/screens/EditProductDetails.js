import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { listProductDetails, UpdateProduct } from "../actions/ProductListActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from "../constants/ProductListConstants"
import FormComponent from "../components/FormComponent"

function EditProductDetails({ match, history }) {
	const productId = match.params.id

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetailsReducer)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const { updatedProduct, success, error: productUpdateError } = productUpdate

	const userReducer = useSelector((state) => state.userReducer)
	const { user } = userReducer

	const [name, setname] = useState("")
	const [price, setprice] = useState(0)
	const [brand, setbrand] = useState("")
	const [category, setcategory] = useState("")
	const [description, setdescription] = useState("")
	const [countInStock, setcountInStock] = useState(0)
	const [image, setimage] = useState("")
	const [uploading, setuploading] = useState(false)

	useEffect(() => {
		if (success) {
			dispatch({
				type: PRODUCT_UPDATE_RESET,
			})
			dispatch({
				type: PRODUCT_DETAILS_RESET,
			})
			history.push("/admin/products")
		} else if (!product || product.id != productId) {
			dispatch(listProductDetails(productId))
		} else {
			setname(product.name)
			setprice(product.price)
			setbrand(product.brand)
			setcategory(product.category)
			setdescription(product.description)
			setcountInStock(product.countInStock)
			setimage(product.image)
		}
	}, [dispatch, match, product, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(UpdateProduct({ id: product.id, name: name, price: price, brand: brand, category: category, description: description, countInStock: countInStock }))
	}

	const uploadImageHandler = async (e) => {
		const file = e.target.files[0]

		const formData = new FormData()
		formData.append("image", file)
		formData.append("product_id", productId)

		setuploading(true)

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${user.access}`,
				},
			}

			const { data } = await axios.post(`/product/image/upload/`, formData, config)

			setuploading(false)
		} catch (error) {
			setuploading(false)
		}
	}

	return (
		<FormComponent>
			<h1>MODIFY PRODUCT</h1>
			<hr />
			{productUpdateError && <Message variant="danger">{productUpdateError}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group controlId="brand">
						<Form.Label>Brand</Form.Label>
						<Form.Control type="text" placeholder="Brand" value={brand} onChange={(e) => setbrand(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group controlId="category">
						<Form.Label>Category</Form.Label>
						<Form.Control type="text" placeholder="Category" value={category} onChange={(e) => setcategory(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group controlId="countInStock">
						<Form.Label>Count In Stock</Form.Label>
						<Form.Control type="number" placeholder="Count In Stock" value={countInStock} onChange={(e) => setcountInStock(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group controlId="price">
						<Form.Label>Price</Form.Label>
						<Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setprice(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group controlId="image">
						<Form.Label>Image</Form.Label>
						<Form.Control type="text" placeholder="Image" value={image} onChange={(e) => setimage(e.target.value)}></Form.Control>
						<p style={{ color: "red", "font-size": "13px" }}></p>
					</Form.Group>
					<Form.Group>
						<Form.File id="product-image" label="Product Image" placeholder="Choose file" onChange={uploadImageHandler}>
							{uploading && <Loader />}
						</Form.File>
					</Form.Group>
					<Button type="submit" variant="primary">
						UPDATE
					</Button>
				</Form>
			)}
		</FormComponent>
	)
}

export default EditProductDetails
