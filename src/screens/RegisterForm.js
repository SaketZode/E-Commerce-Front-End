import React, { useEffect, useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { UserRegisterAction } from "../actions/UserActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

function RegisterForm({ location, history }) {
	const [name, setname] = useState("")
	const [username, setusername] = useState("")
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [confirmpassword, setconfirmpassword] = useState("")
	const [message, setmessage] = useState("")

	const redirect = location.search ? location.search.split("=")[1] : "/"

	const dispatch = useDispatch()

	const userInfo = useSelector((state) => state.userInfo)
	const { error, loading, user } = userInfo

	useEffect(() => {
		if (user) {
			history.push(redirect)
		}
	}, [history, user, redirect])

	const registrationFormHandler = (e) => {
		e.preventDefault()
		if (password !== confirmpassword) {
			setmessage("Passwords do not match")
		} else {
			dispatch(UserRegisterAction(name, username, email, password))
		}
	}

	return (
		<FormContainer>
			<h1>SIGN-UP</h1>
			<hr />
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{message}</Message>}
			{loading && <Loader />}

			<Form onSubmit={registrationFormHandler}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control required type="text" palceholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control required type="text" palceholder="Enter Username" value={username} onChange={(e) => setusername(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control required type="email" palceholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control required type="password" palceholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control required type="password" palceholder="Confirm Password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					REGISTER
				</Button>
			</Form>
			<Row>
				Already a customer? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In</Link>
			</Row>
		</FormContainer>
	)
}

export default RegisterForm

const FormContainer = styled.div`
	width: 35%;
	margin: auto;
`
