import SiteLayout from "../layout/SiteLayout";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import axios from "../configs/axios";
import {toast} from "react-toastify";
import InputField from "../components/InputField";
import {Button, Form, Radio, RadioGroup} from "rsuite";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Stripe from "react-stripe-checkout";
import {setSpinnerContainer} from "../features/spinnerSlice";


const FlightBooking = () => {

    const flightBooking = useSelector(state => state?.flightBooking || []);
    const travellers = useSelector(state => state?.flightQuery?.travellers || 0);
    const tripType = useSelector(state => state?.flightQuery?.tripType || 1);
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state?.auth);

    const passengerFields = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };

    const passengers = [];

    [...Array(parseInt(travellers))].map((v, i) => {
        if (i == 0) {
            passengers.push({
                firstName: auth?.user?.firstname,
                lastName: auth?.user?.lastname,
                email: auth?.user?.email,
                phone: auth?.user?.phone
            });
        } else {
            passengers.push(passengerFields);
        }

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
        onSubmit: async data => {

            dispatch(setSpinnerContainer({show: true}))

            let bookingData = {
                "tripType": tripTypes[tripType],
                "flightId": flightBooking[0]?.id,
                "totalPrice": flightBooking[0]?.ticketPrice * travellers,
                "passengers": data.passengers
            }

            if (tripType == 2) {
                bookingData["totalPrice"] = flightBooking[0]?.ticketPrice + flightBooking[1]?.ticketPrice * travellers;
                bookingData["returnFlightId"] = flightBooking[1]?.id;
            }

            try {

                // create Booking
                const bookingReq = await axios.post("/bookings/book", bookingData);

                // make Payment
                const makePayment = await axios.post("/credit-card/charge", "", {
                    headers: {
                        token: data.token,
                        amount: bookingData.totalPrice,
                    },
                });

                // Confirm booking
                const bookingConfirm = await axios.post(`/bookings/confirm/${bookingReq.data.id}`);

                dispatch(setSpinnerContainer({show: false}))

                toast.success("Successfully booked your flight!");

                navigate("/my-bookings");


            } catch (err) {
                console.log(err);
                dispatch(setSpinnerContainer({show: false}))
                toast.error("Payment failed, try again!");
            }
        }
    });

    async function handleCardPayment(token) {
        formik.setFieldValue("token", token.id);
        formik.handleSubmit();
    }

    const paymentOptionHandler = v => {
        setPaymentOption(v);
    }

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
                                                error={
                                                    formik.touched.passengers?.[index]?.["lastName"] &&
                                                    formik.errors.passengers?.[index]?.["lastName"]
                                                }
                                                onChange={value => formik.setFieldValue(`passengers[${index}].lastName`, value)}
                                            />
                                            <InputField
                                                name={`passengers.${index}.email`}
                                                placeholder="Email"
                                                value={formik.values.passengers[index]["email"]}
                                                error={
                                                    formik.touched.passengers?.[index]?.["email"] &&
                                                    formik.errors.passengers?.[index]?.["email"]
                                                }
                                                onChange={value => formik.setFieldValue(`passengers[${index}].email`, value)}
                                            />
                                            <InputField
                                                name={`passengers.${index}.phone`}
                                                placeholder="Phone"
                                                value={formik.values.passengers[index]["phone"]}
                                                error={
                                                    formik.touched.passengers?.[index]?.["phone"] &&
                                                    formik.errors.passengers?.[index]?.["phone"]
                                                }
                                                onChange={value => formik.setFieldValue(`passengers[${index}].phone`, value)}
                                            />
                                        </div>
                                    })
                                }
                                {
                                    paymentOption !== 'creditCard' && <Button
                                        disabled={true}
                                        className={`float-end my-3`}
                                        appearance="default" type="submit">
                                        Pay and proceed for booking
                                    </Button>
                                }

                                {
                                    paymentOption === 'creditCard' && <Stripe

                                        token={handleCardPayment}

                                        stripeKey="pk_test_z9ub1a8Mi5WggbhUVCFVpmiR">
                                        <Button
                                            className={`float-end my-3`}
                                            appearance="default"
                                            type="button">
                                            Pay and proceed for booking
                                        </Button>
                                    </Stripe>
                                }

                            </Form>
                        </div>
                        <div className={`col-4`}>
                            <h4 className={`mb-3`}>Flight information</h4>
                            {flightBooking?.length > 0 && flightBooking.map(booking => {
                                return <p className={`flightInformation`}>
                                    <strong>{booking?.departureAirport?.code} - {booking?.arrivalAirport?.code}</strong>
                                    <br/>
                                    {booking?.airlineName} <br/> Flight No: {booking?.flightNumber}</p>

                            })}


                            <p><strong>Total:
                                ${flightBooking[0]?.ticketPrice + flightBooking[1]?.ticketPrice * travellers} USD</strong>
                            </p>

                            <h4 className={`my-3`}>Payment information</h4>

                            <RadioGroup onChange={paymentOptionHandler} name="radio-group" defaultValue="A">
                                <Radio value="paypal">Pay with PayPal</Radio>
                                <Radio value="creditCard">Pay with VISA/ MasterCard/ Discover</Radio>
                            </RadioGroup>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SiteLayout>
}

export default FlightBooking;