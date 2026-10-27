import { useEffect, useState } from "react";
import worksData from "../data/works.json";

function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const sortedWorks = [...worksData].sort((a, b) => b.id - a.id);
    setWorks(sortedWorks);
  }, []);

  return (
    <main className="works">
      {works.map((work) => (
        <section key={work.id}>
          <div className="title">
            <h3>{work.title}</h3>
            <small>{work.year_month}</small>
          </div>
          <div>{work.description}</div>
          <img
            src={`${import.meta.env.BASE_URL}${work.image_url.replace(/^\//, "")}`}
            alt={work.title}
            loading="lazy"
            decoding="async"
          />
        </section>
      ))}
    </main>
  );
}

export default Works;
