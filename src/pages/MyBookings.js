import SiteLayout from "../layout/SiteLayout";
import {useEffect, useState} from "react";
import axios from "../configs/axios";
import {FaDownload, FaTrash} from "react-icons/fa6";
import {Table} from "rsuite";
import {useSelector} from "react-redux";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const {Column, HeaderCell, Cell} = Table;

const MyBookings = () => {
    const authUserId = 1;
    const [allBookings, setAllBookings] = useState([]);
    const authUser = useSelector(state => state?.auth?.user)
    useEffect(() => {
        axios.get(`/bookings/by-passenger-email?email=${authUser?.email}`)
            .then(res => setAllBookings(res.data?.content))
            .catch(err => console.log(err));
    }, []);

    const downloadTicket = bookingID => {
        axios.get(`/email/confirmed/ticket/${bookingID}`, {
            responseType: 'blob'
        })
            .then(res => {
                window.open(URL.createObjectURL(res.data))
            })
    }

    return <SiteLayout>
        <div className={`row`}>
            <div className={`col-12`}>
                <div className={`box`}>
                    <h4 className={`mb-4`}>My Bookings</h4>
                    <Table
                        wordWrap="break-word"
                        disabledScroll
                        autoHeight={true}
                        data={allBookings}>
                        <Column width={50}>
                            <HeaderCell>ID</HeaderCell>
                            <Cell dataKey="id"/>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Booking Date</HeaderCell>
                            <Cell dataKey="bookingDate"/>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Passenger(s)</HeaderCell>
                            <Cell>
                                {
                                    rowData => rowData.passengers.map(p => p.firstName + ' ' + p.lastName + ', ')
                                }
                            </Cell>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Airline</HeaderCell>
                            <Cell dataKey="airlineName"/>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Flight Info</HeaderCell>
                            <Cell>
                                {rowData => <p style={{fontSize: '12px'}}>
                                    {'Flight No: ' + rowData.flightNumber}<br/>
                                    {rowData.codeDepartureAirport + ' - ' + rowData.codeArrivalAirport} <br/>
                                    {'Departure: ' + moment(rowData.departureDate).format("MMM D, ddd") + ' ' + moment(rowData.departureTime, 'HH:mm:ss').format("h:mm A")}
                                    <br/>
                                    {'Arrival: ' + moment(rowData.arrivalDate).format("MMM D, ddd") + ' ' + moment(rowData.arrivalTime, 'HH:mm:ss').format("h:mm A")}
                                </p>}
                            </Cell>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Trip Type</HeaderCell>
                            <Cell dataKey="tripType"/>
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Total Price</HeaderCell>
                            <Cell dataKey="totalPrice">
                                {rowData => '$' + rowData.totalPrice}
                            </Cell>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Booking Status</HeaderCell>
                            <Cell dataKey="status"/>
                        </Column>
                        <Column flexGrow={2} align="center">
                            <HeaderCell></HeaderCell>
                            <Cell className={`table_action`}>
                                {rowData => <FaDownload onClick={e => downloadTicket(rowData.id)}
                                                        title={`Download eTicket`}/>}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </div>
    </SiteLayout>
}

export default MyBookings;