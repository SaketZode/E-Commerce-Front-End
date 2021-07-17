import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import styled from "styled-components"
import Ratings from "./Ratings"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		marginTop: 10,
		marginLeft: 0,
		marginRight: 0,
		minHeight: 320,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	cardheader: {
		minHeight: 50,
	},
	cardcontent: {
		maxHeight: 100,
	},
}))

function Product({ product }) {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardHeader className={classes.cardheader} title={product.name} />
			<Link to={`/productdetail/${product.id}`} style={{ textDecoration: "none" }}>
				<CardMedia className={classes.media} image={product.image} title={product.name} />
			</Link>
			<CardContent className={classes.cardcontent}>
				<PriceDiv>
					<strong>Price: &#8377; {product.price}</strong>
				</PriceDiv>
				<RatingDiv>
					<Ratings ratings={product.rating} reviews={product.numReviews} />
				</RatingDiv>
			</CardContent>
		</Card>
	)
}

export default Product

const PriceDiv = styled.div`
	text-align: center;
`

const RatingDiv = styled.div``
