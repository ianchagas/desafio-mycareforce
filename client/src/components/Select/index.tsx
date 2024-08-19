import React from "react";
import { SelectHTMLAttributes } from "react";
import { Container } from "./styles";

type ISelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

const Select: React.FC<ISelectProps> = ({ options, ...rest }) => (
  <Container as="select" {...rest}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Container>
);

export default Select;
