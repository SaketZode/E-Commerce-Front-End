import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { UserProfileAction, UpdateUserProfileAction } from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_PROFILE_UPDATE_RESET } from '../constants/UserConstants'

function ProfileScreen({ history }) {
    const [name, setname] = useState('')
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [message, setmessage] = useState('')

    const dispatch = useDispatch()

    const userProfileDetail = useSelector(state => state.userProfile)
    const {error, loading, userProfile} = userProfileDetail

    const userLogin = useSelector(state => state.userReducer)
    const { user } = userLogin

    const userUpdateProfile = useSelector(state => state.updatedUserProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!user) {
            history.push('/login')
        } else {
            if (success || !user || !userProfile.name) {
                dispatch({
                    type: USER_PROFILE_UPDATE_RESET
                })
                dispatch(UserProfileAction())
            } else {
                setname(userProfile.name)
                setusername(userProfile.username)
                setemail(userProfile.email)
            }
        }
    }, [history, dispatch, userProfile, user, success])

    const updateProfileHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setmessage('Passwords does not match')
        } else {
            dispatch(UpdateUserProfileAction({
                'id': user.id,
                'username': username,
                'email': email,
                'name': name,
                'password': password
            }))
        }
    }

    return (
        <Row>
            <Col md={4}>
                <h1>Profile</h1>
                <hr />
                <FormContainer>
                    <h3>Update Profile</h3>
                    <hr />
                    {
                        message && <Message variant='danger'>{message}</Message>
                    }
                    {
                        error && <Message variant='danger'>{message}</Message>
                    }
                    {
                        loading && <Loader />
                    }

                    <Form onSubmit={updateProfileHandler}>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control
                                required
                                type='text'
                                palceholder='Enter Name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control
                                required
                                type='text'
                                palceholder='Enter Username'
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                required
                                type='email'
                                palceholder='Enter Email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                type='password'
                                palceholder='Enter Password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type='password'
                                palceholder='Confirm Password'
                                value={confirmpassword}
                                onChange={(e) => setconfirmpassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>UPDATE</Button>
                    </Form>
                </FormContainer>
            </Col>
            <Col md={8}>
                <h1>Orders</h1>
                <hr />
            </Col>
        </Row>
    )
}

export default ProfileScreen


const FormContainer = styled.div `
    width: 95%;
    margin: auto;
    padding: 5%;
    background-color: white;
`
