export function generatePassword(length: number) {
  const number = '0123456789';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const special = '!@#$%^&*+';
  let password = '';

  password += upperCase[Math.floor(Math.random() * upperCase.length)];

  for (let i = 0; i < length - 3; i++) {
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  }

  password += number[Math.floor(Math.random() * number.length)];

  password += special[Math.floor(Math.random() * special.length)];

  return password;
}
