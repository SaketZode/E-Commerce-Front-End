import React, { useEffect } from "react"
import { Button, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { DeleteUser, GetUsersList } from "../actions/UserActions"
import EditRoundedIcon from "@material-ui/icons/EditRounded"
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"

function UsersList({ history }) {
	const dispatch = useDispatch()

	const queryParams = history.location.search
	const params = new URLSearchParams(queryParams)
	let pageNo = params.get("page")

	const userList = useSelector((state) => state.userList)
	const { loading, error, userlist, previous, next, total_pages } = userList

	const userDelete = useSelector((state) => state.userDelete)
	const { success: deleteSuccess } = userDelete

	useEffect(() => {
		dispatch(GetUsersList(pageNo))
	}, [dispatch, deleteSuccess, pageNo])

	const handleEditUser = (id) => {
		history.push(`/admin/users/${id}/edit`)
	}

	const handleDeleteUser = (id) => {
		dispatch(DeleteUser(id))
	}

	return (
		<UserListContainer>
			<h2>Users List</h2>
			{error ? (
				<Message variant="danger">{error}</Message>
			) : loading ? (
				<Loader />
			) : (
				<div>
					<Table striped responsive bordered hover className="table" size="sm">
						<thead>
							<tr>
								<th>User ID</th>
								<th>Name</th>
								<th>Username</th>
								<th>Email</th>
								<th>Is Admin</th>
								<th>Operations</th>
							</tr>
						</thead>
						<tbody>
							{userlist.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.isAdmin ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}</td>
									<td>
										<Button variant="primary" size="sm" onClick={() => handleEditUser(user.id)}>
											<EditRoundedIcon />
										</Button>{" "}
										<Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
											<DeleteForeverRoundedIcon />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Row>
						<Paginate page={pageNo} pages={total_pages} keyword={""} next={next} previous={previous} uri="/admin/users" />
					</Row>
				</div>
			)}
		</UserListContainer>
	)
}

export default UsersList

const UserListContainer = styled.div`
	width: 100%;
	margin: auto;
`
