import {useFormik} from 'formik';
import {Input, Button, Form, toaster} from 'rsuite';
import InputField from "../../../components/InputField";
import axios from "../../../configs/axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const AirportAdd = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            city: '',
            country: ''
        },
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.code) {
                errors.code = 'Required';
            }
            if (!values.city) {
                errors.city = 'Required';
            }
            if (!values.country) {
                errors.country = 'Required';
            }
            return errors;
        },
        onSubmit: data => {
            axios.post("/airports", data)
                .then(res => {
                    navigate("/admin/airport/list");
                    toast.success("Successfully saved!")
                });
        }
    });

    return <div className={`box`}>
        <Form className={`w-100`} onSubmit={formik.handleSubmit}>
            <InputField
                name="name"
                placeholder="Airport Name"
                value={formik.values.name}
                error={formik.errors.name}
                onChange={value => formik.setFieldValue('name', value)}
            />

            <InputField
                name="code"
                placeholder="Airport Code"
                value={formik.values.code}
                error={formik.errors.code}
                onChange={value => formik.setFieldValue('code', value)}
            />

            <InputField
                name="city"
                placeholder="City"
                value={formik.values.city}
                error={formik.errors.city}
                onChange={value => formik.setFieldValue('city', value)}
            />

            <InputField
                name="country"
                placeholder="Country"
                value={formik.values.country}
                error={formik.errors.country}
                onChange={value => formik.setFieldValue('country', value)}
            />

            <Button
                className={`float-end`}
                appearance="default" type="submit">
                Submit
            </Button>
        </Form>
    </div>
}

export default AirportAdd;