import React, { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    fetch(`http://localhost:4000/memebook`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Unable to get items.", error));
  },[]);

  return <h1>This is the homePage</h1>;
}
