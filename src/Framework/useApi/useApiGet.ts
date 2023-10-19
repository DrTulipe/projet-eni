export async function ApiGet(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return { result: data, error: null };
  } catch (errorCatch) {
    console.error("Erreur lors de la requête GET:", errorCatch);
    return { result: null, error: errorCatch };
  }
}
