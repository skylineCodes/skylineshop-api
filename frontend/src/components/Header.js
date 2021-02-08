import React, { useEffect, useRef } from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Badge, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import logo from '../SkylineCode-logo-png_logo.png';
import { getAllCart } from '../actions/cartActions';
import '../header.css';

const Header = () => {
  const [openSearch, setOpenSearch] = React.useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

   const cartQty = cartItems.reduce((a, b) => {
      return a + b.qty;
    }, 0);

    const openSearchFunction = (value) => {
      setOpenSearch(value);

      if (value === true) {
        searchDiv.current.style.width = '100%';
        siteHeader.current.style.height = '3.3rem';
      } else {
        searchDiv.current.style.width = '';
        siteHeader.current.style.height = '4.5rem';
      }
    };

  const logoutHandler = () => {
    dispatch(logout());
  }

  const searchDiv = useRef();
  const siteHeader = useRef();

    return (
      <>
        <div className='notification-bar'>
          <span className='notification-bar_message'>
            Free Shipping & Free Returns
          </span>
        </div>
        <header ref={siteHeader} className='site-header'>
          <div>
            <Navbar className='navbar' expand='lg'>
              {!openSearch && (
                <Navbar.Brand as={RouterLink} to='/'>
                  <img src={logo} alt='SkylineShop' height='80' width='200' />
                </Navbar.Brand>
              )}
              {!openSearch && (
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
              )}
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
                {/* <Nav className='header-icons'>
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
                </Nav> */}
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
              <Nav ref={searchDiv} className='search_div'>
                <Nav.Link className='search_link'>
                  {openSearch ? (
                    <div class='form-group-span'>
                      <Route
                        render={({ history }) => (
                          <SearchBox history={history} />
                        )}
                      />
                      <i
                        class='fas fa-times'
                        onClick={() => openSearchFunction(false)}
                      ></i>
                      {/* <a>
                        <i class='fas fa-search'
                          // onClick={() => openSearchFunction(true)}
                        ></i>
                      </a> */}
                    </div>
                  ) : (
                    <div class='search_icon'>
                      <i
                        class='fas fa-search'
                        onClick={() => openSearchFunction(true)}
                      ></i>
                    </div>
                  )}
                </Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </header>
      </>
    );
}

export default Header;
