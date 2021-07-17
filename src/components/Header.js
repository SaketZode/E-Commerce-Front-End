import React, { useState } from "react"
import styled from "styled-components"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { Link, useHistory } from "react-router-dom"
import { Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { UserLogoutAction } from "../actions/UserActions"

function Header() {
	const userReducer = useSelector((state) => state.userReducer)
	const userInfo = userReducer.user

	const dispatch = useDispatch()

	const history = useHistory()

	const [searchtext, setsearchtext] = useState("")

	const searchHandler = (e) => {
		e.preventDefault()
		if (searchtext) {
			history.push(`/?searchtext=${searchtext}`)
		}
	}

	const logoutHandler = (e) => {
		e.preventDefault()
		dispatch(UserLogoutAction())
		history.push("/")
	}

	return (
		<Container>
			<MainContainer>
				<LogoContainer>
					<h2>
						<Link to="/">JustBuyIt</Link>
					</h2>
				</LogoContainer>
				<SearchContainer>
					<SearchInput>
						<input type="text" placeholder="Search..." onChange={(e) => setsearchtext(e.target.value)} value={searchtext} />
					</SearchInput>
					<SearchButton>
						<input type="submit" value="FIND" onClick={searchHandler} />
					</SearchButton>
				</SearchContainer>
				<SubContainer>
					<CartContainer>
						<Link to="/cart">
							<ShoppingCartIcon />
							Cart
						</Link>
					</CartContainer>
					<UserContainer>
						<AccountBoxIcon />
						{userInfo ? (
							<NavDropdown title={userInfo.username}>
								<NavDropdown.Item style={{ backgroundColor: "#4d4d4d" }}>
									<Link to="/profile">Profile</Link>
								</NavDropdown.Item>
								<NavDropdown.Item onClick={logoutHandler} style={{ backgroundColor: "#4d4d4d" }}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Link to="/login">Login</Link>
						)}
					</UserContainer>
				</SubContainer>
			</MainContainer>
		</Container>
	)
}

export default Header

const Container = styled.div``

const MainContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const LogoContainer = styled.div`
	display: flex;
	a {
		text-decoration: none;
		color: white;
	}
	select {
		margin: 0px;
		padding: 0px;
	}
	margin: 0px;
	padding: 0px 10px;
`

const SearchContainer = styled.div`
	display: flex;
	padding: 10px;
	display: flex;
	width: 400px;
	margin: 0px;
	max-height: 50px;
`

const SearchInput = styled.div`
	width: 80%;
	display: flex;
	input {
		width: 100%;
	}
`

const SearchButton = styled.div`
	width: 20%;
	min-width: 50px;
	display: flex;
	input {
		width: 100%;
	}
`

const UserContainer = styled.div`
	display: flex;
	color: white;
	a {
		text-decoration: none;
		color: white;
	}
	padding: 0px 10px;
	margin: 0px 10px;
`

const CartContainer = styled.div`
	a {
		text-decoration: none;
		color: white;
	}
	padding: 0px 10px;
	margin: 0px 10px;
`

const SubContainer = styled.div`
	display: flex;
	padding: 10px;
	min-width: 150px;
`
