export async function ApiGet(url: string, setLoading?: React.Dispatch<React.SetStateAction<boolean>>) {
  const token = localStorage.getItem("token");
  if (setLoading) setLoading(true);

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
    return parsedData;
  } catch (errorCatch) {
    console.error("Erreur lors de la requête GET:", errorCatch);
    return "ERROR";
  } finally {
    if (setLoading) setLoading(false);
  }
}

