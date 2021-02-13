import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

import Products from "./pages/ProductsPage.js";
import About from "./pages/AboutPage.js";
import Navbar from "./navbar.js";
import Home from "./pages/Home.js";
import Cart from "./pages/CartPage.js";
import ProductInfo from "./productinfo.js";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReactRouterSetup = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Products">
            <Products />
          </Route>
          <Route
            path="/Products/:product_name"
            children={<ProductInfo />}
          ></Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/My-Cart">
            <Cart />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default ReactRouterSetup;

/* 
export const Page = () => {
  const [cart, setcart] = useState([]);

  const addtoCart = (event, data) => {
    event.preventDefault();
    setcart((old) => {
      return [...old, data];
    });
  };

  return (
    <div className="flex flex-row overflow-hidden">
      <Navbar cart={cart} />
      <ProductPage addtoCart={addtoCart} />
    </div>
  );
}; */

/* const Herohomepage = () => {
  const imgs = [heroimg, heroimg2];
  const [hero, sethero] = React.useState(imgs[0]);

  return (
    <div className="hero-slider">
      <img src={hero} className="hero-img" />
      <span className="dots">
        <span className="hero-dot" onClick={() => sethero(imgs[0])}></span>
        <span className="hero-dot" onClick={() => sethero(imgs[1])}></span>
        <span className="hero-dot"></span>
      </span>
    </div>
  );
};
 */
/* const Orderform = () => {
  return (
    <form action="">
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
    </form>
  );
}; */
