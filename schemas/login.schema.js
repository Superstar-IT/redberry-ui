import * as yup from 'yup';

export const LoginSchema = yup.object({
    userName: yup.string('enter_username').required('require_username').min(4, 'invalid_length_username'),
    password: yup.string('enter_password').required('require_password').min(8, 'invalid_length_password')
})