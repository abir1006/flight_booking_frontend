import SiteLayout from "../layout/SiteLayout";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import axios from "../configs/axios";
import {toast} from "react-toastify";
import InputField from "../components/InputField";
import {Button, Form, Radio, RadioGroup} from "rsuite";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";


const FlightBooking = () => {

    const flightBooking = useSelector(state => state.flightBooking);
    const travellers = useSelector(state => state.flightQuery?.travellers || 0);
    const tripType = useSelector(state => state.flightQuery?.tripType || 1);
    const navigate = useNavigate();

    const passengerFields = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };

    const passengers = [];

    [...Array(parseInt(travellers))].map(v => {
        passengers.push(passengerFields);
    })

    const tripTypes = {
        1: 'ONE_WAY',
        2: 'ROUND_TRIP'
    }

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        passengers: Yup.array().of(
            Yup.object().shape({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
                phone: Yup.string().required('Phone is required'),
            })
        ),
    });

    const formik = useFormik({
        initialValues: {
            passengers: passengers

        },
        validationSchema,
        onSubmit: data => {
            let bookingData = {
                "tripType": tripTypes[tripType],
                "flightId": flightBooking.id,
                "totalPrice": flightBooking?.ticketPrice * travellers,
                "passengers": data.passengers
            }

            axios.post("/bookings/book", bookingData)
                .then(res => {
                    toast.success("Successfully booked your flight!")
                    navigate("/my-bookings");
                }).catch(err => {
                console.log(err);
            });
        }
    });

    return <SiteLayout>
        <div className={`row`}>
            <div className={`col-12`}>
                <div className={`box`}>
                    <div className={`row`}>
                        <div className={`col-8`}>
                            <h4 className={`mb-3`}>Passenger booking information</h4>
                            <Form className={`w-100`} onSubmit={formik.handleSubmit}>
                                {
                                    [...Array(parseInt(travellers))].map((v, index) => {
                                        return <div className={`passengerFields mb-4`}>
                                            <h5 className={`mb-3`}>Passenger {index + 1} information</h5>
                                            <InputField
                                                name={`passengers.${index}.firstName`}
                                                placeholder="First Name"
                                                value={formik.values.passengers[index]["firstName"]}
                                                error={
                                                    formik.touched.passengers?.[index]?.["firstName"] &&
                                                    formik.errors.passengers?.[index]?.["firstName"]
                                                }
                                                onChange={value => formik.setFieldValue(`passengers[${index}].firstName`, value)}
                                            />
                                            <InputField
                                                name={`passengers.${index}.lastName`}
                                                placeholder="Last Name"
                                                value={formik.values.passengers[index]["lastName"]}
                                                //error={formik.errors.passengers[index]["lastName"]}
                                                onChange={value => formik.setFieldValue(`passengers[${index}].lastName`, value)}
                                            />
                                            <InputField
                                                name={`passengers.${index}.email`}
                                                placeholder="Email"
                                                value={formik.values.passengers[index]["email"]}
                                                //error={formik.errors.passengers[index]["email"]}
                                                onChange={value => formik.setFieldValue(`passengers[${index}].email`, value)}
                                            />
                                            <InputField
                                                name={`passengers.${index}.phone`}
                                                placeholder="Phone"
                                                value={formik.values.passengers[index]["phone"]}
                                                //error={formik.errors.passengers[index]["phone"]}
                                                onChange={value => formik.setFieldValue(`passengers[${index}].phone`, value)}
                                            />
                                        </div>
                                    })
                                }
                                <Button
                                    className={`float-end my-3`}
                                    appearance="default" type="submit">
                                    Pay and proceed for booking
                                </Button>
                            </Form>
                        </div>
                        <div className={`col-4`}>
                            <h4 className={`mb-3`}>Flight information</h4>
                            <p className={`flightInformation`}>
                                <strong>{flightBooking?.departureAirport?.code} - {flightBooking?.arrivalAirport?.code}</strong>
                                <br/>
                                Etihad Airways <br/> Flight No: {flightBooking?.flightNumber}</p>

                            <p><strong>Total: ${flightBooking?.ticketPrice * travellers} USD</strong></p>

                            <h4 className={`my-3`}>Payment information</h4>

                            <RadioGroup name="radio-group" defaultValue="A">
                                <Radio value="A">Pay with PayPal</Radio>
                                <Radio value="B">Pay with VISA</Radio>
                                <Radio value="C">Pay with MasterCard</Radio>
                            </RadioGroup>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SiteLayout>
}

export default FlightBooking;