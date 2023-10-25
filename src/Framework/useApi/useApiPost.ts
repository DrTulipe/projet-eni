import { apiurl } from "./useApiGet";

export async function ApiPost(url: string, datas?: any) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(apiurl + url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datas),
    });
    const data = await response.json();
    if (data && data.trace) return { result: null, error: data };
    return { result: data, error: null };
  } catch (errorCatch) {
    console.error("Erreur lors de la requête POST:", errorCatch);
    return { result: null, error: errorCatch };
  }
}
