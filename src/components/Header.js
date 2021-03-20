import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <Container>
            <Main>
                <LogoContainer>
                    <h2><a href="">JustBuyIt</a></h2>
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
                        <a href="">Cart</a>
                    </CartContainer>
                    <UserContainer>
                        <a href="">Login</a>
                    </UserContainer>
                </SubContainer>
            </Main>
        </Container>
    )
}

export default Header

const Container = styled.div`
    background: #3F0E40;
    display: flex;
    min-width: 100%;
`
const Main = styled.div`
    width: 100%;
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
