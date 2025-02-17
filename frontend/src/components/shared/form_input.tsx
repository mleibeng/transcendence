import React from "react";

interface FormInputProps {
    label: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}


const FormInput: React.FC<FormInputProps> = ({label, type, id, value, onChange, required = false}) => {
return (
    <div>
    <label className="form-label" htmlFor={id}>
    {label}
    </label>
    <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    className="form-input"
    required={required}
    />
</div>
)}

export default FormInput