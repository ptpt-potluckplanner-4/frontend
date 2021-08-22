// schema for signUp form

import * as yup from 'yup';

//describe the perfect formValues object to yup
const signUpFormSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string(),
    username: yup.string().required().min(4, 'User Name must be at least 4 characters long'),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, 'Password must be at least 8 characters long').matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character'),
})

export default signUpFormSchema;


// newPassword: yup
// .string()
// .required('Please enter a password')
// .min(8, 'Password too short')
// .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
// .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
// .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
// .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),