import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    getWorks();
  }, []);

  async function getWorks() {
    const { data, error } = await supabase
      .from("works")
      .select("*")
      .order("id", { ascending: false });

    console.log("data:", data);
    console.log("error:", error);
    if (error) {
      console.error(error);
      return;
    }

    setWorks(data);

    return;
  }

  return (
    <main className="works">
      {works.map((works) => (
        <section key={works.id}>
          <div className="title">
            <h3>{works.title}</h3>
            <small>{works.year_month}</small>
          </div>
          <div>{works.description}</div>
          <img src={works.image_url} alt="" loading="lazy" decoding="async" />
        </section>
      ))}
    </main>
  );
}

export default Works;
