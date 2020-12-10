import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import Paginate from '../components/Paginate.js';
import Meta from '../components/Meta.js';
import ProductCarousel from '../components/ProductCarousel.js';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const page = match.params.page || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, current_page, total_pages } = productList;

    useEffect(() => {
      dispatch(listProducts(keyword, page));
    }, [dispatch, keyword, page]);

    return (
      <>
        <Meta />
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to='/' className='btn btn-light'>
            <i class='fas fa-arrow-left'></i> Go Back
          </Link>
        )}
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              total_pages={total_pages}
              current_page={current_page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </>
    );
}

export default HomeScreen
