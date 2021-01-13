import React from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  Grid,
  Badge,
  ListItem,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { ShoppingCartOutlined, ExpandMore } from '@material-ui/icons';
import logo from '../SkylineCode-logo-png_logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: '#fff',
  },
  navTitle: {
    fontSize: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  cartIcon: {
    textAlign: 'end',
    cursor: 'pointer',
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  toolbarLinks: {
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  lists: {
    display: 'flex',
  },
  listItems: {
    color: '#000',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  signIn: {
    marginRight: '5rem',
    color: '#000',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  leftTypo: {
    marginLeft: '40rem',
  },
  rightTypo: {
    marginLeft: 'auto',
  }
}));

const Header = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const logoutHandler = () => {
    dispatch(logout());
  }

    return (
      <header className={classes.root}>
        <div>
          <AppBar position='fixed' className={classes.navbar} elevation={0}>
            <Toolbar>
              <Grid item xs={4} spacing={3}>
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </Grid>
              <Grid
                item
                xs={4}
                spacing={3}
                className={classes.navTitle}
                component={RouterLink}
                to='/'
              >
                <img src={logo} alt='SkylineCodes' height='80' width='200' />
              </Grid>
              <Grid
                item
                xs={4}
                spacing={3}
                className={classes.cartIcon}
                component={RouterLink}
                to='/cart'
              >
                <Badge badgeContent={cartQty} color='secondary'>
                  <ShoppingCartOutlined fontSize='large' />
                </Badge>
              </Grid>
            </Toolbar>
            <Toolbar className={classes.toolbarLinks}>
              <Typography className={classes.leftTypo}>
                <List className={classes.lists}>
                  <ListItem
                    component={RouterLink}
                    to='/'
                    alignItems='flex-start'
                    className={classes.listItems}
                  >
                    Home
                  </ListItem>
                  <ListItem
                    component={RouterLink}
                    to='/shop'
                    alignItems='flex-start'
                    className={classes.listItems}
                  >
                    Shop
                  </ListItem>
                  <ListItem
                    component={RouterLink}
                    to='/blog'
                    alignItems='flex-start'
                    className={classes.listItems}
                  >
                    Blog
                  </ListItem>
                </List>
              </Typography>
              {userInfo ? (
                <Typography className={classes.rightTypo}>
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                  >
                    {userInfo.name} <ExpandMore />
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem to='/profile' component={RouterLink}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </Typography>
              ) : (
                <Typography className={classes.rightTypo}>
                  <List className={classes.lists}>
                    <ListItem
                      component={RouterLink}
                      to='/login'
                      alignItems='flex-end'
                      className={classes.signIn}
                    >
                      Sign In
                    </ListItem>
                  </List>
                </Typography>
              )}
              {userInfo && userInfo.isAdmin && (
                <Typography>
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                  >
                    Admin
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem to='/admin/userlist' component={RouterLink}>
                      Users
                    </MenuItem>
                    <MenuItem to='/admin/productlist' component={RouterLink}>
                      Products
                    </MenuItem>
                    <MenuItem to='/admin/orderlist' component={RouterLink}>
                      Orders
                    </MenuItem>
                  </Menu>
                </Typography>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </header>
    );
}

export default Header;
