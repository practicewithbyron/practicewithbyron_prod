import validator from "validator";

export function IsEmailValid(email)
{
    return validator.isEmail(email);
}