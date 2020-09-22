import React from "react";

interface SearchbarProps {
  value: string;
  placeholder: string;
  onChange: (e: string) => null;
}

const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      name="query"
      placeholder={placeholder}
      className="form-control my-3"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default Searchbar;
