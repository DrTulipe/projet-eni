interface Props {
  children: any;
  noOverflow?: boolean;
  center?: boolean;
}

export function Container(props: Props) {
  const { children, noOverflow, center } = props;
  return (
    <div
      className={
        "flex px-8 " +
        (noOverflow ? " overflow-hidden " : "") +
        (center ? " justify-center " : "")
      }
    >
      {children}
    </div>
  );
}
