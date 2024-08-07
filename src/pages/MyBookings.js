import SiteLayout from "../layout/SiteLayout";
import {useEffect, useState} from "react";
import axios from "../configs/axios";
import {FaTrash} from "react-icons/fa6";
import {Table} from "rsuite";

const {Column, HeaderCell, Cell} = Table;

const MyBookings = () => {
    const authUserId = 1;
    const [allBookings, setAllBookings] = useState([]);
    useEffect(() => {
        axios.get(`/bookings/by-passenger-email?email=john.doe@example.com`)
            .then(res => setAllBookings(res.data?.content))
            .catch(err => console.log(err));
    }, []);

    const bookingCancelHandler = () => {
    }

    return <SiteLayout>
        <div className={`row`}>
            <div className={`col-12`}>
                <div className={`box`}>
                    <h4 className={`mb-4`}>My Bookings</h4>
                    <Table disabledScroll
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
                                    rowData => rowData.passengers.map(p => p.firstName + ' ' + p.lastName)
                                }
                            </Cell>
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Flight</HeaderCell>
                            <Cell dataKey="flightIds"/>
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
                    </Table>
                </div>
            </div>
        </div>
    </SiteLayout>
}

export default MyBookings;