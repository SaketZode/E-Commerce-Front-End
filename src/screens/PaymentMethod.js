import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { AddPaymentMethod } from "../actions/CartActions"
import Message from "../components/Message"

function PaymentMethod({ nextStep, prevStep, currStep, styleclasses, formsteps }) {
	const [paymentMethod, setpaymentMethod] = useState("")
	const [error, seterror] = useState("")

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		if (paymentMethod === "") {
			seterror("Please select the payment method")
		} else {
			dispatch(AddPaymentMethod(paymentMethod))
			nextStep()
		}
	}

	return (
		<FormContainer>
			{error && <Message variant="danger">{error}</Message>}
			<h1>Select Payment Method</h1>
			<hr />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Check type="radio" value="PayPal" label="PayPal" name="paymentoption" onChange={(e) => setpaymentMethod(e.target.value)}></Form.Check>
					<Form.Check type="radio" value="CreditCard" label="CreditCard" name="paymentoption" onChange={(e) => setpaymentMethod(e.target.value)}></Form.Check>
					<Form.Check type="radio" value="DebitCard" label="DebitCard" name="paymentoption" onChange={(e) => setpaymentMethod(e.target.value)}></Form.Check>
					<Form.Check type="radio" value="Wallet" label="Wallet" name="paymentoption" onChange={(e) => setpaymentMethod(e.target.value)}></Form.Check>
				</Form.Group>
				<Form.Group>
					<Button variant="contained" disabled={currStep === 0} onClick={prevStep}>
						Back
					</Button>
					<Button type="submit" variant="primary">
						{currStep === formsteps.length - 1 ? "Finish" : "Next"}
					</Button>
				</Form.Group>
			</Form>
		</FormContainer>
	)
}

export default PaymentMethod

const FormContainer = styled.div`
	width: 35%;
	margin: auto;
`
