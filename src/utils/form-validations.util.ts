const validateDateExpire = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

export function required(label: string) {
  return (v: string) => !!v || `Campo ${label} é obrigatório`;
}

export function exactChars(chars: number) {
  return (v: string) => v.length === chars || `Deve conter ${chars} caracteres`;
}

export function validDateExpire(v: string) {
  return validateDateExpire.test(v) || v === '' || 'Data inválida';
}

export function validateLengthAndRequired(
  label: string,
  length: number,
  value: string
) {
  const errorMessages = [];
  const requiredValidationPassed = required(label)(value);
  const minCharValidationPassed = exactChars(length)(value);
  if (typeof requiredValidationPassed === 'string')
    errorMessages.push(requiredValidationPassed);
  if (typeof minCharValidationPassed === 'string')
    errorMessages.push(minCharValidationPassed);
  if (!errorMessages.length) return true;

  return errorMessages;
}
export function validateCpf(value: string) {
  return validateLengthAndRequired('CPF', 11, value);
}

export function validateCardNumber(value: string) {
  return validateLengthAndRequired('número do cartão de crédito', 16, value);
}
