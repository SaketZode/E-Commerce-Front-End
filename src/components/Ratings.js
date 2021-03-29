import React from 'react'
import Rating from '@material-ui/lab/Rating';
import styled from 'styled-components';

function Ratings({rating, reviews}) {
    return (
        <RatingsContainer>
            <Rating value={rating} precision={0.5} readOnly />
            <p>({rating}) {reviews} reviews</p>
        </RatingsContainer>
    )
}

export default Ratings

const RatingsContainer = styled.div `
    text-align: center;
`
