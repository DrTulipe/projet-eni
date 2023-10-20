import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export async function fetchCampus() {
  const { result, error } = await ApiGet("https://yourapi.com/campus");

  if (error) {
    console.error("Erreur lors de la récupération des campus:", error);
    return [];
  }

  return result;
}

export async function createCampus(data: any) {
  const { result, error } = await ApiPost("https://yourapi.com/campus", data);

  if (error) {
    console.error("Erreur lors de la création du campus:", error);
    return null;
  }

  return result;
}
