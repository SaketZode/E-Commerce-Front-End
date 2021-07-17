import React from "react"
import styled from "styled-components"

function FormComponent({ children }) {
	return <FormContainer>{children}</FormContainer>
}

export default FormComponent

const FormContainer = styled.div`
	width: 70%;
	margin: auto;
	background-color: white;
	padding: 5px 15px;
	min-width: 400px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 25px;
	border-radius: 10px;
`
