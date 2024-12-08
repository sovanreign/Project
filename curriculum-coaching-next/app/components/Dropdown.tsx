import React from "react";

interface DropdownProps {
    data: { value: string; label: string }[];
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    data = [],
    name,
    value,
    onChange,
    placeholder = "Select an option",
    className,
}) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={className}
        >
            {/* Placeholder option */}
            <option value="" disabled>
                {placeholder}
            </option>
            {/* Render data options */}
            {data.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
