import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import bag from "./assets/bag.png";
import logo from "./assets/logo.jpg";
import { CartContext } from "./context/CartContext";

const Navbar = () => {
  return (
    <nav className="flex z-50 top-0 h-10 bg-white justify-between ">
      <span className="my-auto py-7 px-14">
        <NavLink to="/">
          <img src={logo} alt="logo" id="my-logo" className="w-52" />
        </NavLink>
      </span>
      <NavbarMenu />
    </nav>
  );
};
const NavbarMenu = () => {
  const { cart } = useContext(CartContext);
  useEffect(() => {}, [cart]);
  return (
    <div className=" w-4/12 py-7 px-14 justify-end text-base flex-row flex">
      <NavLink to="/" exact className="m-auto active:text-coffee">
        Home
      </NavLink>

      <NavLink to="/Products" exact className="m-auto active:text-coffee">
        Products
      </NavLink>
      <span className="m-auto flex-row flex justify-between">
        <NavLink to="/My-Cart">
          <div className="w-full relative">
            <span className="absolute w-5 text-sm text-center ml-3 mt-0 rounded-full bg-coffee text-white">
              {cart.length ? cart.length : null}
            </span>
            <img src={bag} alt="cart" width="20px" className="w-6" />
          </div>
        </NavLink>
      </span>
    </div>
  );
};

export default Navbar;
