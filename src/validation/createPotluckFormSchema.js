import * as yup from 'yup';

//describe the perfect formValues object to yup
const signUpFormSchema = yup.object().shape({
    title: yup.string().required().min(2, 'Title must be at least 2 characters long'),
    date: yup.date().default(() => new Date()),
    time: yup.string().required(),
    location: yup.string().email().required(),
    // food: yup.string().required(),
})

export default signUpFormSchema;