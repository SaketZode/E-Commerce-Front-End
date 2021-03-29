import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import Product from '../components/Product'

function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get(`/products`)
            setProducts(data)
        }

        fetchProducts()
    }, [])
    return (
        <Container>
            <h1>Products</h1>
            <hr/>
            <Row>
                
                { products.map(prod => (
                    <Col key={ prod.id } sm={12} md={6} lg={4} xl={3}>
                        <Product product={prod} />
                    </Col>
                )) }
                
            </Row>
        </Container>
    )
}

export default ProductList
