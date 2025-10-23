import { ValidationArguments } from 'class-validator';

export const requiredFieldMessage = (validationArguments: ValidationArguments) => {
  return `${validationArguments.property} est obligatoire.`;
};
export const minLengthMessage = (min: number) => {
  return (validationArguments: ValidationArguments) => {
    return `${validationArguments.property} doit contenir au moins ${min} caractères.`;
  };
};
export const maxLengthMessage = (max: number) => {
  return (validationArguments: ValidationArguments) => {
    return `${validationArguments.property} doit contenir au maximum ${max} caractères.`;
  };
};
