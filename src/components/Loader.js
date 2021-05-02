import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <Spinner animation = 'grow' variant='dark' role = 'status' style={{
            height: '100px',
            width: '100px',
            display: 'block',
            margin: 'auto'
        }}>
        </Spinner>
    )
}

export default Loader
