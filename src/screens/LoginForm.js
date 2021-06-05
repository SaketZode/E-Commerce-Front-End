import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UserLoginAction } from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function LoginForm({ location, history }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernamealert, setusernamealert] = useState('')
    const [passwordalert, setpasswordalert] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const dispatch = useDispatch()
    
    const userInfo = useSelector(state => state.userReducer)
    const {error, loading, user} = userInfo

    const validateForm = () => {
        if (username === '') {
            setusernamealert('Please fill out the username')
        }
        if(password === '') {
            setpasswordalert('Please fill out the password')
        }
    }

    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [history, user, redirect])

    const loginFormSubmit = (e) => {
        e.preventDefault()
        if (!(username === '' || password === '')) {
            dispatch(UserLoginAction(username, password))
        } else {
            validateForm()
            console.log('invalid form')
        }
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
                    <p style={{'color': 'red', 'font-size': '13px'}}>{usernamealert}</p>
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
                    <p style={{'color': 'red', 'font-size': '13px'}}>{passwordalert}</p>
                </Form.Group>
                <Button type='submit' variant='primary'>LOGIN</Button>
                <br/><br/>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                
            </Form>
        </FormContainer>
    )
}

export default LoginForm

const FormContainer = styled.div `
    width: 35%;
    margin: auto;
    background-color: white;
    padding: 5px 15px;
    min-width: 400px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 25px;
    border-radius: 10px;
    
`
