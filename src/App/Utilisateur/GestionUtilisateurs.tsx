import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "./Compte";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export async function createFormateur(data: any) {
  const { result, error } = await ApiPost("/api/utilisateur/create", data);

  if (error) {
    console.error("Erreur lors de la création du formateur:", error);
    return null;
  }

  return result;
}

export async function editFormateur(data: any) {
  const { result, error } = await ApiPost("/api/utilisateur/edit", data);

  if (error) {
    console.error("Erreur lors de la création du formateur:", error);
    return null;
  }

  return result;
}


