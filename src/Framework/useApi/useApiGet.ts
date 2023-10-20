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
    if (data && data.trace) return { result: null, error: data };
    return { result: data, error: null };
  } catch (errorCatch) {
    console.error("Erreur lors de la requête GET:", errorCatch);
    return { result: null, error: errorCatch };
  }
}
