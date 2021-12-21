export interface ProfileInput {
  className: string;
  label: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  placeholder: string;
  readOnly?: boolean;
}

export const ProfileInput = ({
  className,
  label,
  type,
  name,
  onChange,
  value,
  placeholder,
  readOnly,
}: ProfileInput) => {
  return (
    <div className="grid grid-cols-12 mt-4">
      <span className="col-span-2">{label}</span>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${className} px-2 col-start-4 col-end-12`}
        readOnly={readOnly}
      />
    </div>
  );
};
