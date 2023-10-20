import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export async function fetchFormateurs() {
  const { result, error } = await ApiGet("https://yourapi.com/formateurs");

  if (error) {
    console.error("Erreur lors de la récupération des formateurs:", error);
    return [];
  }

  return result;
}

export async function createFormateur(data: any) {
  const { result, error } = await ApiPost(
    "https://yourapi.com/formateurs",
    data
  );

  if (error) {
    console.error("Erreur lors de la création du formateur:", error);
    return null;
  }

  return result;
}
