import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UserLoginAction } from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function LoginForm({ location, history }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const dispatch = useDispatch()
    
    const userInfo = useSelector(state => state.userReducer)
    const {error, loading, user} = userInfo

    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [history, user, redirect])

    const loginFormSubmit = (e) => {
        console.log('login form submit')
        e.preventDefault()
        dispatch(UserLoginAction(username, password))
    }

    return (
        <FormContainer>
            <h1>LOGIN</h1>
            <hr />
            {
                error && <Message variant='danger'>{error}</Message>
            }
            {
                loading && <Loader />
            }
            <Form onSubmit={loginFormSubmit}>
                <Form.Group controlId='username'>    
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>LOGIN</Button>
                <Row>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginForm

const FormContainer = styled.div `
    width: 35%;
    margin: auto;
`
