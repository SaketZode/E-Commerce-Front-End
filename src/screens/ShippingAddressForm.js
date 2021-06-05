import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CheckoutAction } from '../actions/CartActions'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function ShippingAddressForm({ history, nextStep, prevStep, currStep, styleclasses, formsteps }) {
    const cart = useSelector(state => state.cartReducer)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    
    const [address, setaddress] = useState(shippingAddress ? shippingAddress.address : '')
    const [city, setcity] = useState(shippingAddress ? shippingAddress.city : '')
    const [zipcode, setzipcode] = useState(shippingAddress ? shippingAddress.zipcode : '')
    const [country, setcountry] = useState(shippingAddress ? shippingAddress.country : '')

    const addressSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(CheckoutAction({ address, city, zipcode, country }))
        nextStep()
    }

    const styles = useStyles()

    return (
        <div>
            <FormContainer>
                <h1>Shipping Address</h1>
                <hr />
                <Form onSubmit={addressSubmitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>
                            Street
                        </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={(e) => setaddress(e.target.value)}
                            value={address}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            City
                        </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={(e) => setcity(e.target.value)}
                            value={city}
                        ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Zip Code
                            </Form.Label>
                            <Form.Control
                                required
                                type='text'
                                onChange={(e) => setzipcode(e.target.value)}
                                value={zipcode}
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Country
                        </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={(e) => setcountry(e.target.value)}
                            value={country}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            disabled={currStep === 0}
                            onClick={prevStep}
                            className={styles.backButton}
                            variant='contained'
                        >
                            Back
                        </Button>
                        <Button variant="primary" type='submit'>
                            {currStep === formsteps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Form.Group>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ShippingAddressForm

const FormContainer = styled.div `
    width: 35%;
    margin: auto;
`
