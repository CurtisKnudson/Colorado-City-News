import { ACCENT } from "@constants/design";
import { SpinnerDotted } from "spinners-react";
import { ProfileUrlValidation } from "./userInfo";

interface AddornmentInputWithValidatonProps {
  className: string;
  label: string;
  type: string;
  name: string;
  onChange: any;
  value: string | undefined;
  placeholder: string;
  readOnly?: boolean;
  validation: ProfileUrlValidation;
}

export const AdornmentInputWithValidation = ({
  className,
  label,
  type,
  name,
  onChange,
  value,
  placeholder,
  readOnly,
  validation,
}: AddornmentInputWithValidatonProps) => {
  const adornment = () => {
    switch (validation) {
      case ProfileUrlValidation.DEFAULT:
        return null;
      case ProfileUrlValidation.INVALID:
        return "X";
      case ProfileUrlValidation.PENDING:
        return (
          <SpinnerDotted size={20} thickness={100} speed={100} color={ACCENT} />
        );
      case ProfileUrlValidation.VALID:
        return "^";
      default:
        ProfileUrlValidation.DEFAULT;
    }
  };
  return (
    <div className="grid grid-cols-12 mt-4">
      <span className="col-span-3">{label}</span>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${className} col-start-4 col-end-12 px-2`}
        readOnly={readOnly}
      />
      <div className=" col-start-12 col-end-13 mx-1">{adornment()}</div>
    </div>
  );
};
