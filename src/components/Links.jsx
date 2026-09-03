import { Link } from "react-router-dom";

function Links() {
  return (
    <section>
      <h2>Links</h2>

      <ul>
        <li>
          <Link to="/works">WORKS</Link>
        </li>
        <li>
          <Link to="/shop">SHOP</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/guest">GUEST</Link>
        </li>
        <li>
          <Link to="/journal">JOURNAL</Link>
        </li>
      </ul>
    </section>
  );
}

export default Links;
