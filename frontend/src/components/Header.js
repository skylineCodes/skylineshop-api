import React, { useEffect } from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Badge, NavDropdown, Form, FormControl, Button, Col, Row } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import logo from '../SkylineCode-logo-png_logo.png';
import { getAllCart } from '../actions/cartActions';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSearch, setOpenSearch] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

   const cartQty = cartItems.reduce((a, b) => {
      return a + b.qty;
    }, 0);

    const openSearchFunction = (value) => {
      setOpenSearch(value);
    };

  const logoutHandler = () => {
    dispatch(logout());
  }

    return (
      <>
        <div className='notification-bar'>
          <span className='notification-bar_message'>
            Free Shipping & Free Returns
          </span>
        </div>
        <header className='site-header'>
          <div>
            <Navbar className='navbar' expand='lg'>
              <Navbar.Brand as={RouterLink} to='/'>
                <img src={logo} alt='SkylineShop' height='80' width='200' />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='header-links'>
                    <Nav.Link className='links_text' as={RouterLink} to='/'>
                      Home
                    </Nav.Link>
                    <Nav.Link className='links_text' href='#shop'>
                      Shop
                    </Nav.Link>
                    <Nav.Link className='links_text' href='#blog'>
                      Blog
                    </Nav.Link>
                  </Nav>
                  <Nav className='header-icons'>
                    <Nav.Link className='links_icons'>
                      {openSearch ? (
                        <div class='form-group-span'>
                          <Route
                            render={({ history }) => (
                              <SearchBox history={history} />
                            )}
                          />
                        </div>
                      ) : (
                        <div class='login_cart'>
                          <i
                            class='fas fa-search'
                            onClick={() => openSearchFunction(true)}
                          ></i>
                        </div>
                      )}
                    </Nav.Link>
                  </Nav>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      className='links_icons login_cart'
                    >
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      )}
                      <NavDropdown.Item onClick={logoutHandler}>
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Nav.Link
                      className='links_icons login_cart'
                      as={RouterLink}
                      to='/login'
                    >
                      Log In
                    </Nav.Link>
                  )}
                  <Nav.Link
                    className='links_icons login_cart'
                    as={RouterLink}
                    to='/cart'
                  >
                    <span>
                      <i class='fas fa-shopping-cart'></i>
                      <Badge pill variant='danger'>
                        {cartQty}
                      </Badge>
                    </span>
                  </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
      </>
    );
}

export default Header;
