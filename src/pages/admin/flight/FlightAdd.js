import { useFormik } from 'formik';
import { Input, Button, Form, Dropdown } from 'rsuite';
import InputField from "../../../components/InputField";
import axios from "../../../configs/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightAdd = () => {
    const [airports, setAirports] = useState([]);
    const [selectedDepartureAirportId, setSelectedDepartureAirportId] = useState('');
    const [selectedArrivalAirportId, setSelectedArrivalAirportId] = useState('');

    useEffect(() => {
        getAirportData();
    }, []);

    const getAirportData = () => {
        axios.get(`/airports`).then(res => {
            setAirports(res.data);
        }).catch(err => {
            console.log(err);
        });
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
            // Convert availableSeats to integer and ticketPrice to float
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
                availableSeats: parseInt(data.availableSeats, 10), // Convert to integer
                flightLogo: data.flightLogo,
                ticketPrice: parseInt(data.ticketPrice) // Convert to float
            };

            axios.post("/flights/admin", payload)
                .then(res => {
                    navigate("/admin/flight/list");
                    toast.success("Successfully saved!");
                });
        }
    });

    const handleDropdownSelect = (value, type) => {
        if (type === 'departure') {
            setSelectedDepartureAirportId(value);
            formik.setFieldValue('departureAirport', { id: value });
        } else if (type === 'arrival') {
            setSelectedArrivalAirportId(value);
            formik.setFieldValue('arrivalAirport', { id: value });
        }
    };

    return (
        <div className={`box`}>
            <Form className={`w-100`} onSubmit={formik.handleSubmit}>
                <InputField
                    name="flightNumber"
                    placeholder="Flight Number"
                    value={formik.values.flightNumber}
                    error={formik.errors.flightNumber}
                    onChange={value => formik.setFieldValue('flightNumber', value)}
                />

                <Dropdown
                    title={airports.find(airport => airport.id === selectedDepartureAirportId)?.name || "Select Departure Airport"}
                    onSelect={(value) => handleDropdownSelect(value, 'departure')}
                >
                    {
                        airports.map(item => (
                            <Dropdown.Item key={item.id} eventKey={item.id}>
                                {item.name}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown>

                <Dropdown
                    title={airports.find(airport => airport.id === selectedArrivalAirportId)?.name || "Select Arrival Airport"}
                    onSelect={(value) => handleDropdownSelect(value, 'arrival')}
                >
                    {
                        airports.map(item => (
                            <Dropdown.Item key={item.id} eventKey={item.id}>
                                {item.name}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown>

                <InputField
                    name="availableSeats"
                    type="number"
                    placeholder="Available Seats"
                    value={formik.values.availableSeats}
                    error={formik.errors.availableSeats}
                    onChange={value => formik.setFieldValue('availableSeats', value)}
                />

                <InputField
                    name="flightLogo"
                    placeholder="Flight Logo URL"
                    value={formik.values.flightLogo}
                    error={formik.errors.flightLogo}
                    onChange={value => formik.setFieldValue('flightLogo', value)}
                />

                <InputField
                    name="ticketPrice"
                    type="number"
                    placeholder="Ticket Price"
                    value={formik.values.ticketPrice}
                    error={formik.errors.ticketPrice}
                    onChange={value => formik.setFieldValue('ticketPrice', value)}
                />

                <DatePicker
                    selected={formik.values.flightSchedule.departureDate}
                    onChange={(date) => formik.setFieldValue('flightSchedule.departureDate', date)}
                    placeholderText="Departure Date"
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    selected={formik.values.flightSchedule.arrivalDate}
                    onChange={(date) => formik.setFieldValue('flightSchedule.arrivalDate', date)}
                    placeholderText="Arrival Date"
                    dateFormat="yyyy-MM-dd"
                />
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
