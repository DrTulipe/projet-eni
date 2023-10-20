export async function ApiPost(url: string, datas: any) {
  const token = localStorage.getItem("token");
  console.log("ApiPost", token);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datas),
    });

    return { result: await response.json(), error: null };
  } catch (errorCatch) {
    console.error("Erreur lors de la requête POST:", errorCatch);
    return { result: null, error: errorCatch };
  }
}
