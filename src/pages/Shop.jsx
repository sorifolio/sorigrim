import { NavLink, Outlet } from "react-router-dom";

function Shop() {
  return (
    <main className="shop">
      <header>
        <NavLink to="/shop" end>
          Etsy
        </NavLink>
        <NavLink to="/shop/products">Products</NavLink>
      </header>

      <Outlet />
    </main>
  );
}

export default Shop;
