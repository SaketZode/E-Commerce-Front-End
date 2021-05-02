import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {
    const [show, setshow] = useState(true)
    return (
        <Alert variant={variant} show={show} onClose={() => setshow(false)} dismissible>
            {children}
        </Alert>
    )
}

export default Message
