import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export async function fetchClasses() {
  const { result, error } = await ApiGet("https://127.0.0.1:8000/api/classes");

  if (error) {
    console.error("Erreur lors de la récupération des classes:", error);
    return [];
  }

  return result;
}

export async function createClass(data: any) {
  const { result, error } = await ApiPost("https://127.0.0.1:8000/api/classes", data);

  if (error) {
    console.error("Erreur lors de la création de la classe:", error);
    return null;
  }

  return result;
}
