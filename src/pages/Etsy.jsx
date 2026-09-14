import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EtsyProducts() {
  const [etsyProducts, setEtsyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEtsyProducts();
  }, []);

  async function getEtsyProducts() {
    try {
      const response = await fetch(
        "https://qcnzjacnjvpshdguamqz.supabase.co/functions/v1/etsy-products?action=listings",
      );

      const data = await response.json();

      console.log("Etsy data:", data);

      if (!response.ok) {
        console.error(data);
        return;
      }

      setEtsyProducts(data.listings || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <header>
        <Link to="/shop" className="is-active">
          Etsy
        </Link>
        <Link to="/shop/products">Products</Link>
      </header>

      <section>
        {etsyProducts.map((etsy) => (
          <a
            href={etsy.url}
            key={etsy.listing_id}
            target="_blank"
            rel="noreferrer"
          >
            <img src={etsy.images?.[0]?.url_170x135} alt={etsy.title} />
            <div className="title">
              <h2>{etsy.title}</h2>
              <div>{etsy.description}</div>
            </div>

            <strong>
              {etsy.price.amount / etsy.price.divisor}{" "}
              {etsy.price.currency_code}
            </strong>
          </a>
        ))}
      </section>
    </main>
  );
}

export default EtsyProducts;
