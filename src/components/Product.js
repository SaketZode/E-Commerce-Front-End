import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    minHeight: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardheader: {
    minHeight: 130,
  },
  cardcontent: {
      maxHeight: 100,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardheader}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
      />
      <Link to={`/productdetail/${product.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
      </Link>
      <CardContent className={classes.cardcontent}>
        <PriceDiv>
          <strong>Price: &#8377; {product.price}</strong>
        </PriceDiv>
        <RatingDiv>
            <Ratings ratings={product.rating} reviews={product.numReviews}/>
        </RatingDiv>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><strong>Description:</strong></Typography>
          <Typography paragraph>{product.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Product;

const PriceDiv = styled.div`
  text-align: center;
`

const RatingDiv = styled.div `
`
