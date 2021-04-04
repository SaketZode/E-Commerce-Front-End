import { React, useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/ProductListActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

function ProductList() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productReducer)
    const { error, loading, products } = productList
    
    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return (
        <Container>
            <h1>Products</h1>
            <hr/>
            {
                loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :
                <Row>
                    
                    { products.map(prod => (
                        <Col key={ prod.id } sm={12} md={6} lg={4} xl={3}>
                            <Product product={prod} />
                        </Col>
                    )) }
                    
                </Row>
            }
        </Container>
    )
}

export default ProductList
