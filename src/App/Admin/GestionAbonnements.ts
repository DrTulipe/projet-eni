import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";

export async function fetchAbonnements() {
  const { result, error } = await ApiGet(
    "https://127.0.0.1:8000/api/abonnement"
  );

  if (error) {
    console.error("Erreur lors de la récupération des abonnements:", error);
    return [];
  }

  return result;
}

export async function suscribeAbonnement(data: any) {
  const { result, error } = await ApiPost(
    "https://127.0.0.1:8000/api/abonnement",
    data
  );

  if (error) {
    console.error("Erreur lors de l'inscription à l'abonnement:", error);
    return null;
  }

  return result;
}
