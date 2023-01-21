interface Props {
  children: any;
}
export function FilterBar(props: Props) {
  const { children } = props;
  return <div className="navbar bg-base-100 space-x-4">{children}</div>;
}
