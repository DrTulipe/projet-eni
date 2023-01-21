import classNames from 'classnames';
import React, { useId } from 'react';
import { FaAsterisk } from 'react-icons/fa';

type Props = {
  name: string,
  label?: string,
  type?: 'text' | 'password' | 'email'
  defaultValue?: any
  required?: boolean
  placeholder?: string
};

export const Input: React.FC<Props> = ({name, label, type, defaultValue, required, placeholder }) => {
  const inputId = useId();

  const labelClasses = classNames("text-semibold text-gray-700 flex gap-2 items-center");
  const inputClasses = classNames("w-full border rounded p-2 invalid:border-red-500");

  return (<>
  <div className="flex flex-col gap-2">
    {label && <label className={labelClasses} htmlFor={inputId}>
      {/* <div>{label}</div> */}
       {required && (<div><FaAsterisk className="text-red-500 text-sm" /></div>)}
    </label>}
    <input
      required={required}
      className={inputClasses}
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder || label || undefined}
    />
  </div>
  </>);
}

Input.defaultProps = {
  type: 'text'
};