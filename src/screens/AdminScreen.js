import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Jumbotron } from "react-bootstrap"
import { Route, Router, Switch } from "react-router"
import UsersList from "./UsersList"
import AdminHome from "./AdminHome"
import OrdersList from "./OrdersList"
import AdminProducts from "./AdminProducts"
import EditUserDetails from "./EditUserDetails"
import EditProductDetails from "./EditProductDetails"
import OrderDetails from "./OrderDetails"
import AddProduct from "./AddProduct"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		zIndex: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	adminIcon: {
		justifyContent: "center",
	},
}))

export default function AdminScreen({ history }) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CssBaseline />

			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<ListItem className={classes.adminIcon}>
							<h1>
								<i class="fas fa-user-secret"></i>
							</h1>
						</ListItem>
						<ListItem className={classes.adminIcon}>
							<h3>Admin Panel</h3>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem
							button
							key="home"
							onClick={() => {
								history.push("/admin")
							}}
						>
							<ListItemText primary="Home" />
						</ListItem>
						<Divider />
						<ListItem
							button
							key="usermanagement"
							onClick={() => {
								history.push("/admin/users/")
							}}
						>
							<ListItemText primary="User Management" />
						</ListItem>
						<Divider />
						<ListItem
							button
							key="productmanagement"
							onClick={() => {
								history.push("/admin/products/")
							}}
						>
							<ListItemText primary="Product Management" />
						</ListItem>
						<Divider />
						<ListItem
							button
							key="ordermanagement"
							onClick={() => {
								history.push("/admin/orders/")
							}}
						>
							<ListItemText primary="Order Management" />
						</ListItem>
						<Divider />
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				<Toolbar />
				<Jumbotron>
					<Switch>
						<Route exact path="/admin" component={AdminHome} />
						<Route exact path="/admin/users" component={UsersList} />
						<Route exact path="/admin/orders" component={OrdersList} />
						<Route exact path="/admin/products/" component={AdminProducts} />
						<Route exact path="/admin/users/:id/edit" component={EditUserDetails} />
						<Route exact path="/admin/products/:id/edit" component={EditProductDetails} />
						<Route exact path="/admin/orders/:id/detail" component={OrderDetails} />
						<Route path="/admin/product/add" component={AddProduct} />
					</Switch>
				</Jumbotron>
			</main>
		</div>
	)
}
