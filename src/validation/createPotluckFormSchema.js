import * as yup from 'yup';

//describe the perfect formValues object to yup
const createPotluckFormSchema = yup.object().shape({
    title: yup.string().required().min(2, 'Title must be at least 2 characters long'),    
    date: yup.date().default(() => new Date()),
    time: yup.string().required('required'),
    location: yup.string().required('required'),
    // food: yup.string().required(),
    // food: yup.string().required(),
})

export default createPotluckFormSchema;   


    // date: yup.date().default(() => new Date()),
    // time: yup.string().required(),
    // location: yup.string().required(),
    // food: yup.string().required(),
