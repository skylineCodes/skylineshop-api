import React from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Badge, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import logo from '../SkylineCode-logo-png_logo.png';

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

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
                <img src={logo} alt='SkylineCodes' height='80' width='200' />
              </Navbar.Brand>
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
              </Nav>
            </Navbar>
          </div>
        </header>
      </>

      // <NavDropdown title={userInfo.name} id='username'>
      //   <LinkContainer to='/profile' >
      //     <NavDropdown.Item>Profile</NavDropdown.Item>
      //   </LinkContainer>
      // </NavDropdown>
      // <header className={classes.root}>
      //   <div>
      //     <AppBar position='fixed' className={classes.navbar} elevation={0}>
      //       <Toolbar>
      //         <Grid item xs={4} spacing={3}>
      //           <Route
      //             render={({ history }) => <SearchBox history={history} />}
      //           />
      //         </Grid>
      //         <Grid
      //           item
      //           xs={4}
      //           spacing={3}
      //           className={classes.navTitle}
      //           component={RouterLink}
      //           to='/'
      //         >
      //           <img src={logo} alt='SkylineCodes' height='80' width='200' />
      //         </Grid>
      //         <Grid
      //           item
      //           xs={4}
      //           spacing={3}
      //           className={classes.cartIcon}
      //           component={RouterLink}
      //           to='/cart'
      //         >
      //           <Badge badgeContent={cartQty} color='secondary'>
      //             <ShoppingCartOutlined fontSize='large' />
      //           </Badge>
      //         </Grid>
      //       </Toolbar>
      //       <Toolbar className={classes.toolbarLinks}>
      //         <Typography className={classes.leftTypo}>
      //           <List className={classes.lists}>
      //             <ListItem
      //               component={RouterLink}
      //               to='/'
      //               alignItems='flex-start'
      //               className={classes.listItems}
      //             >
      //               Home
      //             </ListItem>
      //             <ListItem
      //               component={RouterLink}
      //               to='/shop'
      //               alignItems='flex-start'
      //               className={classes.listItems}
      //             >
      //               Shop
      //             </ListItem>
      //             <ListItem
      //               component={RouterLink}
      //               to='/blog'
      //               alignItems='flex-start'
      //               className={classes.listItems}
      //             >
      //               Blog
      //             </ListItem>
      //           </List>
      //         </Typography>
      //         {userInfo ? (
      //           <Typography className={classes.rightTypo}>
      //             <Button
      //               aria-controls='simple-menu'
      //               aria-haspopup='true'
      //               onClick={handleClick}
      //             >
      //               {userInfo.name} <ExpandMore />
      //             </Button>
      //             <Menu
      //               id='simple-menu'
      //               anchorEl={anchorEl}
      //               keepMounted
      //               open={Boolean(anchorEl)}
      //               onClose={handleClose}
      //             >
      //               <MenuItem to='/profile' component={RouterLink}>
      //                 Profile
      //               </MenuItem>
      //               <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      //             </Menu>
      //           </Typography>
      //         ) : (
      //           <Typography className={classes.rightTypo}>
      //             <List className={classes.lists}>
      //               <ListItem
      //                 component={RouterLink}
      //                 to='/login'
      //                 alignItems='flex-end'
      //                 className={classes.signIn}
      //               >
      //                 Sign In
      //               </ListItem>
      //             </List>
      //           </Typography>
      //         )}
      //         {userInfo && userInfo.isAdmin && (
      //           <Typography>
      //             <Button
      //               aria-controls='simple-menu'
      //               aria-haspopup='true'
      //               onClick={handleClick}
      //             >
      //               Admin
      //             </Button>
      //             <Menu
      //               id='simple-menu'
      //               anchorEl={anchorEl}
      //               keepMounted
      //               open={Boolean(anchorEl)}
      //               onClose={handleClose}
      //             >
      //               <MenuItem to='/admin/userlist' component={RouterLink}>
      //                 Users
      //               </MenuItem>
      //               <MenuItem to='/admin/productlist' component={RouterLink}>
      //                 Products
      //               </MenuItem>
      //               <MenuItem to='/admin/orderlist' component={RouterLink}>
      //                 Orders
      //               </MenuItem>
      //             </Menu>
      //           </Typography>
      //         )}
      //       </Toolbar>
      //     </AppBar>
      //   </div>
      // </header>
    );
}

export default Header;
