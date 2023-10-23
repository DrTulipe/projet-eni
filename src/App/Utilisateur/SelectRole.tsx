import React from 'react';

interface RoleSelectProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const roles = [
  {value:'ROLE_USER', libelle : "Enseignant"},
  // {value:'ROLE_ADMIN', libelle : "Responsable pédagogique"} ,
  // {value:'ROLE_SUPPORT', libelle : "Support"},
  {value:'ROLE_RESPONSABLE_PLANNING', libelle : "Responsable Planning"},
];
export const RoleSelect: React.FC<RoleSelectProps> = ({ selectedRole, onRoleChange }) => {

  return (
    <select 
      value={selectedRole}
      onChange={(e) => onRoleChange(e.target.value)}
      className="input input-bordered w-full"
    >
      <option value="" disabled>Choisir un rôle</option>
      {roles.map(role => (
        <option key={role.value} value={role.value}>{role.libelle}</option>
      ))}
    </select>
  );
}
