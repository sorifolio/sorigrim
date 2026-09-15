import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    getWorks();
  }, []);

  async function getWorks() {
    const { data, error } = await supabase.from("works").select("*");

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
    <main>
      {works.map((works) => (
        <section key={works.id}>
          <div className="title">
            <h2>{works.title}</h2>
            <small>{works.year_month}</small>
            <div>{works.description}</div>
          </div>
          <img src={`${import.meta.env.BASE_URL}${works.image_url}`} alt="" />
        </section>
      ))}
    </main>
  );
}

export default Works;
