interface InputSelectValueLabel {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  values: InputSelectValueLabel[];
}
export function InputSelect(props: Props) {
  const { name, label, values } = props;
  return (
    <select className="select select-bordered w-full max-w-xs" name={name}>
      <AlimenterSelect name={name} label={label} values={values} />
    </select>
  );
}

function AlimenterSelect(props: Props) {
  const { label, values } = props;
  return (
    <>
      <option selected accessKey={"default"}>
        {label}
      </option>
      {values.map((e: InputSelectValueLabel) => {
        return (
          <option selected accessKey={e.value}>
            {e.label}
          </option>
        );
      })}
    </>
  );
}
