import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { GetUserById, UpdateUserDetails } from "../actions/UserActions"
import FormComponent from "../components/FormComponent"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { UPDATE_USER_DETAILS_RESET } from "../constants/UserConstants"

function EditUserDetails({ match, history }) {
	const userId = match.params.id

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const updateUser = useSelector((state) => state.updateUser)
	const { loading: updateLoading, success, error: updateError } = updateUser

	const [name, setname] = useState("")
	const [email, setemail] = useState("")
	const [username, setusername] = useState("")
	const [isAdmin, setisAdmin] = useState(false)

	useEffect(() => {
		if (success) {
			dispatch({
				type: UPDATE_USER_DETAILS_RESET,
			})
			history.push("/admin/users")
		} else {
			if (!user || user.id != userId) {
				dispatch(GetUserById(userId))
			} else {
				setname(user.name)
				setemail(user.email)
				setusername(user.username)
				setisAdmin(user.isAdmin)
			}
		}
	}, [dispatch, match, user, success])

	const modifyUserDetails = (e) => {
		e.preventDefault()
		console.log("modifying user details")
		dispatch(UpdateUserDetails({ id: user.id, name: name, email: email, isAdmin: isAdmin, username: username }))
	}

	return (
		<FormComponent>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div>
					<h1>Edit User</h1>
					<hr />
					{updateLoading && <Loader />}
					{updateError && <Message variant="danger">{updateError}</Message>}
					<Form onSubmit={modifyUserDetails}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => setusername(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Check type="checkbox" checked={isAdmin} label="Make Admin" onChange={(e) => setisAdmin(e.target.checked)}></Form.Check>
						</Form.Group>
						<Button type="submit" variant="primary">
							UPDATE
						</Button>
					</Form>
				</div>
			)}
		</FormComponent>
	)
}

export default EditUserDetails
