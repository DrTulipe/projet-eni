import { apiurl } from "./useApiGet";

export async function ApiDelete(url: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(apiurl + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data && data.trace) return { result: null, error: data };
    return { result: data, error: null };
  } catch (errorCatch) {
    console.error("Erreur lors de la requête PUT:", errorCatch);
    return { result: null, error: errorCatch };
  }
}
