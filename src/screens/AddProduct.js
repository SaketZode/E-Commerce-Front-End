import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { CreateProduct } from "../actions/ProductListActions"
import FormComponent from "../components/FormComponent"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_CREATE_RESET } from "../constants/ProductListConstants"

function AddProduct({ history }) {
	const dispatch = useDispatch()

	const productCreateReducer = useSelector((state) => state.productCreateReducer)
	const { error, product, loading, success } = productCreateReducer

	const [name, setname] = useState("")
	const [price, setprice] = useState(0)
	const [brand, setbrand] = useState("")
	const [category, setcategory] = useState("")
	const [description, setdescription] = useState("")
	const [countInStock, setcountInStock] = useState(0)
	const [image, setimage] = useState(null)

	useEffect(() => {
		if (success) {
			dispatch({
				type: PRODUCT_CREATE_RESET,
			})
			history.push(`/admin/products`)
		}
	}, [dispatch, success])

	const uploadImageHandler = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		setimage(file)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append("name", name)
		formData.append("price", price)
		formData.append("brand", brand)
		formData.append("description", description)
		formData.append("countInStock", countInStock)
		formData.append("category", category)
		formData.append("image", image)

		dispatch(CreateProduct(formData))
	}

	return (
		<FormComponent>
			<h1>NEW PRODUCT</h1>
			<hr />
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
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
				<Form.Group>
					<Form.File id="product-image" label="Product Image" placeholder="Choose file" onChange={uploadImageHandler}>
						{/*uploading && <Loader />*/}
					</Form.File>
				</Form.Group>
				<Button type="submit" variant="primary">
					ADD
				</Button>
			</Form>
		</FormComponent>
	)
}

export default AddProduct
