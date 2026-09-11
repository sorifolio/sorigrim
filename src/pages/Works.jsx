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
    <section>
      {works.map((works) => (
        <div key={works.id}>
          <div className="title">
            <h2>{works.title}</h2>
            <small>{works.year}</small>
            <div>{works.description}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Works;
