export async function ApiGet(url: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data && data.trace) return "ERROR";
    const parsedData = JSON.parse(data);
    console.log("parsedData", parsedData);
    return parsedData;
  } catch (errorCatch) {
    console.error("Erreur lors de la requête GET:", errorCatch);
    return "ERROR";
  }
}
