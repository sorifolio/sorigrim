import { Link } from "react-router-dom";

function Links() {
  return (
    <section>
      <h2>Links</h2>

      <div className="links">
        <Link to="/works">WORKS</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/guest">GUEST</Link>
        <Link to="/journal">JOURNAL</Link>
      </div>
    </section>
  );
}

export default Links;
