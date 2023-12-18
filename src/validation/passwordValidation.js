import passwordValidator from "password-validator";

export const PasswordValidation = (password) => {
    const customMessages = {
        min: 'Password must be at least 8 characters long ',
        uppercase: 'Password must include at least one uppercase letter ',
        lowercase: 'Password must include at least one lowercase letter ',
        digits: 'Password must include at least one digit ',
        symbols: 'Password must include at least one symbol ',
        oneOf: 'Password is too common '
      };
  
    const schema = new passwordValidator();
    schema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols()
        .is().not().oneOf(['Passw0rd', 'Password123']);

    const errors = schema.validate(password, { list: true });

    errors.forEach((err, index) => {
        errors[index] = customMessages[err];
    })

    return errors;
}