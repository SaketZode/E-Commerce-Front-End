import React, { useEffect } from "react"
import { Button, Container, Table, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { ListOrdersAction } from "../actions/OrderActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import DoneIcon from "@material-ui/icons/Done"
import ClearIcon from "@material-ui/icons/Clear"
import VisibilityIcon from "@material-ui/icons/Visibility"
import Paginate from "../components/Paginate"

function OrdersList({ history }) {
	const dispatch = useDispatch()

	const queryParams = history.location.search
	const params = new URLSearchParams(queryParams)
	let pageNo = params.get("page")

	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders, previous, next, total_pages } = orderList

	useEffect(() => {
		dispatch(ListOrdersAction(pageNo))
	}, [dispatch, pageNo])

	const handleOrderDetails = (id) => {
		history.push(`/admin/orders/${id}/detail`)
	}

	return (
		<Container>
			<h1>ORDERS LIST</h1>
			<hr />

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div>
					<Table striped hover bordered size="sm">
						<thead>
							<tr>
								<th>Order Id</th>
								<th>Order Date</th>
								<th>Total Amount</th>
								<th>Payment Status</th>
								<th>Delivery Status</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id}>
									<td>{order.id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>{order.isPaid ? <DoneIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}</td>
									<td>{order.isDelivered ? <DoneIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}</td>
									<td>
										<Button variant="primary" size="sm" onClick={(e) => handleOrderDetails(order.id)}>
											<VisibilityIcon size="sm" />
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

export default OrdersList
