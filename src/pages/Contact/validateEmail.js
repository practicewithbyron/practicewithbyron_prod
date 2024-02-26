import validator from "validator";

export function validateEmail(email)
{
    return validator.isEmail(email);
}