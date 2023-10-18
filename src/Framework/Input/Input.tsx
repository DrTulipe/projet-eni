import classNames from 'classnames';
import React, { forwardRef, useId } from 'react';
import { FaAsterisk } from 'react-icons/fa';

type Props = {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email';
  defaultValue?: any;
  required?: boolean;
  placeholder?: string;
};

export const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, type='text', defaultValue, required, placeholder },
  ref
) => {
  const inputId = useId();

  const labelClasses = classNames("text-semibold text-gray-700 flex gap-2 items-center");
  const inputClasses = classNames("w-full border rounded p-2 invalid:border-red-500");

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
        // ref={ref}
        defaultValue={defaultValue}
        placeholder={placeholder || label || undefined}
      />
    </div>
  );
};

export const InputForwarded = forwardRef(Input);
