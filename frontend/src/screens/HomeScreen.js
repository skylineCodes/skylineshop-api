import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import Collection from '../components/Collection';
import Product from '../components/Product';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import Meta from '../components/Meta.js';
import ProductCarousel from '../components/ProductCarousel.js';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const page = match.params.page || 1;

    const pageSize = 4;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
      dispatch(listProducts(keyword, page, pageSize));
    }, [dispatch, keyword, page]);

    return (
      <div>
        <Meta />
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to='/' className='btn btn-light'>
            <i class='fas fa-arrow-left'></i> Go Back
          </Link>
        )}
        <div className='gap-element'></div>
        <section className='collection-section'>
          <Row>
            <Collection />
          </Row>
        </section>
        <div className='gap-element'></div>
        <section className='new-arrivals-section'>
          <div className='new-arrrivals-header'>
            <h1>New Arrivals</h1>
          </div>
          <div className='is-divider'></div>
          <div className='new-arrivals-gap-element'></div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row className='new-arrivals-products-card'>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </section>
        <div className='gap-element'></div>
        <section className='offer-section'>
          <div className='offer-header'>
            <h1>What we can offer you</h1>
          </div>
          <div className='is-divider'></div>
          <div className='offer-gap-element'></div>
          <Row>
            <Col xs={12} sm={12} lg={4} className='icon-box-center'>
              <div className='offer-image-div'>
                <Image
                  src='../images/delivery-icon.png'
                  alt='delivery-icon'
                  className='offer-image-1'
                  fluid
                />
              </div>
              <h2>Swift Delivery</h2>
              <p>
                Ut eu fringilla lacus, vel viverra nulla. Aenean volutpat tortor
                nec malesuada eleifend.
              </p>
            </Col>
            <Col xs={12} sm={12} lg={4} className='icon-box-center'>
              <div className='offer-image-div'>
                <Image
                  src='../images/customer-service-icon.png'
                  alt='customer-service-icon'
                  className='offer-image-2'
                  fluid
                />
              </div>
              <h2>Customer Service</h2>
              <p>
                Ut eu fringilla lacus, vel viverra nulla. Aenean volutpat tortor
                nec malesuada eleifend.
              </p>
            </Col>
            <Col xs={12} sm={12} lg={4} className='icon-box-center'>
              <div className='offer-image-div'>
                <Image
                  src='../images/satisfaction-icon.png'
                  alt='satisfaction-icon'
                  className='offer-image-3'
                  fluid
                />
              </div>
              <h2>Guaranteed Satisfaction</h2>
              <p>
                Ut eu fringilla lacus, vel viverra nulla. Aenean volutpat tortor
                nec malesuada eleifend.
              </p>
            </Col>
          </Row>
        </section>
      </div>
    );
}

export default HomeScreen
