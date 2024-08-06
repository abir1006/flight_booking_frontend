import { useFormik } from 'formik';
import { AutoComplete, Button, Form } from 'rsuite';
import InputField from "../../../components/InputField";
import axios from "../../../configs/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setQuery } from "../../../features/flightQuerySlice";
import { useDispatch } from "react-redux";

const FlightAdd = () => {
    const [airports, setAirports] = useState([]);
    const [selectedDepartureAirportId, setSelectedDepartureAirportId] = useState('');
    const [selectedArrivalAirportId, setSelectedArrivalAirportId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getAirportData();
    }, []);

    const getAirportData = () => {
        axios.get(`/airports`).then(res => {
            const airportData = res.data.map(row => ({
                id: row.id,
                code: row.code,
                name: `${row.code} - ${row.name}, ${row.city}, ${row.country}`
            }));
            setAirports(airportData);
        }).catch(err => {
            console.log(err);
        });
    };

    const searchFrom = (value) => {
        const airportCode = value.split("-")[0].trim();
        const selectedAirport = airports.find(data => data.code === airportCode);
        if (selectedAirport) {
            setSelectedDepartureAirportId(selectedAirport.id);
            dispatch(setQuery({ departureAirportId: selectedAirport.id }));
        }
    };

    const searchTo = (value) => {
        const airportCode = value.split("-")[0].trim();
        const selectedAirport = airports.find(data => data.code === airportCode);
        if (selectedAirport) {
            setSelectedArrivalAirportId(selectedAirport.id);
            dispatch(setQuery({ arrivalAirportId: selectedAirport.id }));
        }
    };

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            flightNumber: '',
            departureAirport: { id: '' },
            arrivalAirport: { id: '' },
            flightSchedule: {
                departureDate: new Date(),
                arrivalDate: new Date(),
                departureTime: new Date(),
                arrivalTime: new Date()
            },
            availableSeats: '',
            flightLogo: '',
            ticketPrice: ''
        },
        validate: values => {
            const errors = {};
            if (!values.flightNumber) {
                errors.flightNumber = 'Required';
            }
            if (!selectedDepartureAirportId) {
                errors.departureAirport = 'Required';
            }
            if (!selectedArrivalAirportId) {
                errors.arrivalAirport = 'Required';
            }
            if (!values.flightSchedule.departureDate) {
                errors.flightSchedule = { departureDate: 'Required' };
            }
            if (!values.flightSchedule.arrivalDate) {
                errors.flightSchedule = { ...errors.flightSchedule, arrivalDate: 'Required' };
            }
            if (!values.flightSchedule.departureTime) {
                errors.flightSchedule = { ...errors.flightSchedule, departureTime: 'Required' };
            }
            if (!values.flightSchedule.arrivalTime) {
                errors.flightSchedule = { ...errors.flightSchedule, arrivalTime: 'Required' };
            }
            if (!values.availableSeats) {
                errors.availableSeats = 'Required';
            }
            if (!values.flightLogo) {
                errors.flightLogo = 'Required';
            }
            if (!values.ticketPrice) {
                errors.ticketPrice = 'Required';
            }
            return errors;
        },
        onSubmit: data => {
            const payload = {
                flightNumber: data.flightNumber,
                departureAirport: { id: selectedDepartureAirportId },
                arrivalAirport: { id: selectedArrivalAirportId },
                flightSchedule: {
                    departureDate: data.flightSchedule.departureDate.toISOString().split('T')[0],
                    arrivalDate: data.flightSchedule.arrivalDate.toISOString().split('T')[0],
                    departureTime: data.flightSchedule.departureTime.toTimeString().split(' ')[0],
                    arrivalTime: data.flightSchedule.arrivalTime.toTimeString().split(' ')[0]
                },
                availableSeats: parseInt(data.availableSeats, 10),
                flightLogo: data.flightLogo,
                ticketPrice: parseFloat(data.ticketPrice)
            };

            axios.post("/flights/admin", payload)
                .then(() => {
                    navigate("/admin/flight/list");
                    toast.success("Successfully saved!");
                });
        }
    });

    return (
        <div className={`box`}>
            <Form className={`w-100`} onSubmit={formik.handleSubmit}>
                <InputField
                    name="flightNumber"
                    placeholder="Enter Flight Number"
                    value={formik.values.flightNumber}
                    error={formik.errors.flightNumber}
                    onChange={value => formik.setFieldValue('flightNumber', value)}
                />
                <div className={`row`}>
                    <div className={`col-4`}>
                        <AutoComplete
                            placeholder="Departure Airport"
                            data={airports.map(item => item.name)}
                            onSelect={searchFrom}
                        />
                    </div>
                    <div className={`col-4`}>
                        <AutoComplete
                            placeholder="Arrival Airport"
                            data={airports.map(item => item.name)}
                            onSelect={searchTo}
                        />
                    </div>
                </div>
                <div>
                    <br/>
                </div>
                <div className={`row`}>
                    <div className={`col-4`}>
                        <InputField
                            name="availableSeats"
                            type="number"
                            placeholder="Available Seats"
                            value={formik.values.availableSeats}
                            error={formik.errors.availableSeats}
                            onChange={value => formik.setFieldValue('availableSeats', value)}
                        />
                    </div>
                    <div className={`col-4`}>

                        <InputField
                            name="flightLogo"
                            placeholder="Flight Logo URL"
                            value={formik.values.flightLogo}
                            error={formik.errors.flightLogo}
                            onChange={value => formik.setFieldValue('flightLogo', value)}
                        />
                    </div>
                    <div className={`col-4`}>
                        <InputField
                            name="ticketPrice"
                            type="number"
                            placeholder="Ticket Price"
                            value={formik.values.ticketPrice}
                            error={formik.errors.ticketPrice}
                            onChange={value => formik.setFieldValue('ticketPrice', value)}
                        />
                    </div>
                </div>
                <div>
                    <br/>
                </div>

                <div className={`row`}>
                    <span>Select Departure Date and time</span>
                    <div className={`col-4`}>
                        <DatePicker
                            selected={formik.values.flightSchedule.departureDate}
                            onChange={(date) => formik.setFieldValue('flightSchedule.departureDate', date)}
                            placeholderText="Departure Date"
                            dateFormat="yyyy-MM-dd"

                        />
                    </div>
                    <div className={`col-4`}>
                        <DatePicker
                            selected={formik.values.flightSchedule.departureTime}
                            onChange={(date) => formik.setFieldValue('flightSchedule.departureTime', date)}
                            placeholderText="Departure Time"
                            showTimeSelect
                            showTimeSelectOnly
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="HH:mm"
                        />
                    </div>
                </div>
                <div className={`row`}>
                    <span>Select Arrival Date and time</span>
                    <div className={`col-4`}>
                        <DatePicker
                            selected={formik.values.flightSchedule.arrivalDate}
                            onChange={(date) => formik.setFieldValue('flightSchedule.arrivalDate', date)}
                            placeholderText="Arrival Date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className={`col-4`}>
                        <DatePicker
                            selected={formik.values.flightSchedule.arrivalTime}
                            onChange={(date) => formik.setFieldValue('flightSchedule.arrivalTime', date)}
                            placeholderText="Arrival Time"
                            showTimeSelect
                            showTimeSelectOnly
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="HH:mm"
                        />
                    </div>
                </div>

                        <Button
                            className={`float-end`}
                            appearance="default"
                            type="submit"
                        >
                            Submit
                        </Button>
            </Form>
        </div>
);
};

export default FlightAdd;
