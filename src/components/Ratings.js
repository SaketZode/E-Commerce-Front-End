import React from 'react'
import Rating from '@material-ui/lab/Rating';
import styled from 'styled-components';

function Ratings({ratings, reviews}) {
    return (
        <RatingsContainer>
            <Rating value={ratings ? ratings: 0} precision={0.5} readOnly />
            <p>({ratings}) {reviews} reviews</p>
        </RatingsContainer>
    )
}

export default Ratings

const RatingsContainer = styled.div `
    text-align: center;
`
