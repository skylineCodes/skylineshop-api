import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserEditScreen from './screens/UserEditScreen';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    fontFamily: 'Nunito',
    color: '#273647',
  },
  mainPage: {
    paddingTop: '150px',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <main className={classes.mainPage}>
          <Container fluid>
            <Route path='/login' component={LoginScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route
              exact
              path='/admin/productlist'
              component={ProductListScreen}
            />
            <Route
              exact
              path='/admin/productlist/:page'
              component={ProductListScreen}
            />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:page' component={HomeScreen} />
            <Route
              exact
              path='/search/:keyword/page/:page'
              component={HomeScreen}
            />
            <Route exact path='/' component={HomeScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
