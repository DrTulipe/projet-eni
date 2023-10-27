import classNames from "classnames";
import React, { forwardRef, useId } from "react";
import { FaAsterisk } from "react-icons/fa";

// vérif email
const regexEmail =
  /^[a-zA-Z0-9._-]+[a-zA-Zàáâäãåæçèéêëìíîïðòóôöõøùúûüýÿ._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export function invalidEmailBool(email?: string | null) {
  if (regexEmail.test(email ?? "")) return false;
  return true;
}
export function InvalidEmailInfo(props: { email?: string | null }) {
  if (regexEmail.test(props.email ?? "")) return null;
  return (
    <label className="border border-red-500 p-2 inline-block text-red-500">
      Veuillez fournir un email valide (exemple@exemple.com).
    </label>
  );
}

// vérif password
const regexPassword =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

export function passwordCheckBool(password?: string | null) {
  if (regexPassword.test(password ?? "")) return false;
  return true;
}
export function PasswordCheck(props: { password?: string | null }) {
  const { password } = props;
  if (regexPassword.test(password ?? "")) return null;
  return (
    <label className="border border-red-500 p-2 m-2 inline-block text-red-500">
      Le mot de passe doit faire minimum 8 caractères, et contenir une majuscule
      et un caractère spécial minimum.
    </label>
  );
}

//verif code postal
export function invalidCodePostalBool(codePostal?: number | null) {
  if (!codePostal || codePostal < 1 || codePostal > 99999) return true;
  return false;
}
export function InvalidCodePostalSize(props: { codePostal?: number | null }) {
  const { codePostal } = props;
  if (!codePostal || codePostal < 1 || codePostal > 99999)
    return (
      <label className="border border-red-500 p-2 inline-block text-red-500">
        Le code postal doit se trouver entre 1 et 99 999.
      </label>
    );
  else return null;
}

// verif telephone
const regexPhone = /^0[123456789]\d{8}$/;
export function invalidPhoneBool(phone?: number | null) {
  if (regexPhone.test(phone?.toString() ?? "")) return false;
  return true;
}
export function InvalidPhoneInfo(props: { phone?: number | null }) {
  if (regexPhone.test(props.phone?.toString() ?? "")) return null;
  return (
    <label className="border border-red-500 p-2 inline-block text-red-500">
      Veuillez fournir un numéro de téléphone valide (format : 06XXXXXXXX).
    </label>
  );
}

// champ requis vide
export function champRequisVideBool(fieldValue?: string | null) {
  if (!fieldValue || fieldValue.toString().trim() === "") {
    return true;
  }
  return false;
}

export function ChampRequis(props: { fieldValue?: string | null }) {
  const { fieldValue } = props;
  if (!fieldValue || fieldValue.toString().trim() === "")
    return (
      <label className="border border-red-500 p-2 inline-block text-red-500">
        Ce champ est requis.
      </label>
    );
  else return null;
}

type Props = {
  name: string;
  label?: string;
  type?: "text" | "password" | "email";
  defaultValue?: any;
  required?: boolean;
  placeholder?: string;
};

export const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, type = "text", defaultValue, required, placeholder },
  ref
) => {
  const inputId = useId();

  const labelClasses = classNames(
    "text-semibold text-gray-700 flex gap-2 items-center"
  );
  const inputClasses = classNames(
    "w-full border rounded p-2 invalid:border-red-500"
  );

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={labelClasses} htmlFor={inputId}>
          {required && <FaAsterisk className="text-red-500 text-sm" />}
        </label>
      )}
      <input
        required={required}
        className={inputClasses}
        name={name}
        type={type}
        width={250}
        defaultValue={defaultValue}
        placeholder={placeholder || label || undefined}
      />
    </div>
  );
};
