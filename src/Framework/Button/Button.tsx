import classNames from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactElement | string
  onClick?: () => void,
  variant?: 'default'
};

export const Button: React.FC<Props> = ({ children, onClick, variant }) => {
  const classes = classNames(
    "px-4 py-2 text-center rounded font-semibold",
    "transition focus:outline-none focus:ring",
    {
      "bg-primary border-b-2 border-primary-darken hover:bg-primary-darken text-white": variant === 'default'
    }
  );
  return (<>
    <button className={classes} onClick={onClick} >
      {children}
    </button>
  </>);
}

Button.defaultProps = {
  variant: 'default',
  onClick: () => {}
};

export default Button;