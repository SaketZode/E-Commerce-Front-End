import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Container>
            <MainContainer>
                <LogoContainer>
                    <h2><Link to="/">JustBuyIt</Link></h2>
                </LogoContainer>
                <SearchContainer>
                    <SearchInput>
                        <input type="text" placeholder="Search..."/>
                    </SearchInput>
                    <SearchButton>
                        <input type="submit" value="FIND"/>
                    </SearchButton>
                </SearchContainer>
                <SubContainer>
                    <CartContainer>
                        <Link to="/cart"><ShoppingCartIcon />Cart</Link>
                    </CartContainer>
                    <UserContainer>
                        <Link to=""><AccountCircleIcon />Login</Link>
                    </UserContainer>
                </SubContainer>
            </MainContainer>
        </Container>
    )
}

export default Header

const Container = styled.div `
`

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const LogoContainer = styled.div `
    display: flex;
    a {
        text-decoration: none;
        color: white;
    }
    margin: 0px;
    padding: 0px 10px;
`

const SearchContainer = styled.div `
    display: flex;
    padding: 10px;
    display: flex;
    width: 400px;
    margin: 0px;
`

const SearchInput = styled.div `
    width: 80%;
    display: flex;
    input {
        width: 100%;
    }
`

const SearchButton = styled.div `
    width: 20%;
    min-width: 50px;
    display: flex;
    input {
        width: 100%;
    }
`

const UserContainer = styled.div `
    display: flex;
    a {
        text-decoration: none;
        color: white
    }
    padding: 0px 10px;
    margin: 0px 10px;
`

const CartContainer = styled.div `
    a {
        text-decoration: none;
        color: white;
    }
    padding: 0px 10px;
    margin: 0px 10px;
`

const SubContainer = styled.div `
    display: flex;
    padding: 10px;
    min-width: 150px;
`
