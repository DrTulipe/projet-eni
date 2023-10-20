import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export async function fetchCampus() {
  const { result, error } = await ApiGet("https://127.0.0.1:8000/api/campus");

  if (error) {
    console.error("Erreur lors de la récupération des campus:", error);
    return [];
  }

  return result;
}

export async function createCampus(data: any) {
  const { result, error } = await ApiPost("https://127.0.0.1:8000/api/campus", data);

  if (error) {
    console.error("Erreur lors de la création du campus:", error);
    return null;
  }

  return result;
}
