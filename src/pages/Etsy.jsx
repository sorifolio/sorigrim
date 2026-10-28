import { useEffect, useState } from "react";

function Etsy() {
  const [etsyProducts, setEtsyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEtsyProducts();
  }, []);

  async function getEtsyProducts() {
    try {
      const response = await fetch("/api/etsy");
      const data = await response.json();

      setEtsyProducts(data.results || []);
    } catch (error) {
      console.error("Etsy 상품 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="loading">
        <div className="loader"></div>
      </section>
    );
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
          <div className="image">
            <img
              src={
                etsy.images?.[0]?.url_570xN ||
                etsy.images?.[0]?.url_fullxfull ||
                ""
              }
              alt={etsy.title}
            />
          </div>
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
