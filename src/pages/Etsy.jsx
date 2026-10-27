import { useEffect, useState } from "react";

function Etsy() {
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
    return <section>Loading...</section>;
  }

  return (
    <section className="etsy">
      {etsyProducts.map((etsy) => (
        <a
          href={etsy.url}
          key={etsy.listing_id}
          target="_blank"
          rel="noreferrer"
        >
          <img src={etsy.images?.[0]?.url_570xN} alt={etsy.title} />
          <div className="title">
            <h2>{etsy.title}</h2>
            <p>{etsy.description}</p>
          </div>

          <strong>
            {etsy.price.amount / etsy.price.divisor} {etsy.price.currency_code}
          </strong>
        </a>
      ))}
    </section>
  );
}

export default Etsy;
