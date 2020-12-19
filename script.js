(function () {
  // should change it in future
  const URL = "http://localhost:5000/api/clicks/";
  const domain = window.location.hostname;
  document.addEventListener("click", async () => {
    console.log("hey");
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ domain }),
    });
    const data = await res.json();
    console.log(data);
  });
})();
