import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export async function fetchFormateurs() {
  const { result, error } = await ApiGet(
    "https://127.0.0.1:8000/api/formateurs"
  );

  if (error) {
    console.error("Erreur lors de la récupération des formateurs:", error);
    return [];
  }

  return result;
}

export async function createFormateur(data: any) {
  const { result, error } = await ApiPost(
    "https://127.0.0.1:8000/api/formateurs",
    data
  );

  if (error) {
    console.error("Erreur lors de la création du formateur:", error);
    return null;
  }

  return result;
}
