import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const cart = useSelector(state => state.cart);
  return (
    <div className="navbar bg-primary text-base-200 shadow-sm px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="btn drawer-button bg-primary border-0 shadow-none text-base-200 p-0 mr-4 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
            </div>
            <div className="drawer-side z-10">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-1">
                <li className="text-lg"><NavLink to='/'>Home</NavLink></li>
                <li className="text-lg"><NavLink to='products'>Products</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
        <NavLink to='/' className="text-xl text-white">ShoppyGlobe</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 flex gap-2">
          <li className="text-lg p-3 hover:bg-primary hover:text-white"><NavLink to='/'>Home</NavLink></li>
          <li className="text-lg p-3 hover:bg-primary hover:text-white"><NavLink to='products'>Products</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div tabIndex={0} role="button" className="btn bg-primary border-0 shadow-none text-base-200 hover:text-white btn-circle">
          <NavLink to='/cart' className="indicator">
            <BsCart3 className="w-6 h-6"/>
            {
              cart.length > 0 &&
              <span className="badge h-4 w-2 indicator-item">{cart.length}</span>
            }
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header;