import { useEffect, useState } from "react";
import { Pagination, Table } from 'rsuite';
import axios from "../../../configs/axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { confirm } from "react-confirm-box";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Column, HeaderCell, Cell } = Table;

const FlightList = () => {

    const [airports, setFlights] = useState([])
    const [limit, setLimit] = useState(14);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        getFlightData(page);
    }, []);

    const getFlightData = page => {
        page = page - 1;
        axios.get(`/flights/admin/paged?page=${page}&size=${limit}`).then(res => {
            setFlights(res.data?.content);
            setTotalRecords(res.data?.totalElements);
        }).catch(err => {
            console.log(err)
            // if (err.response.status === 500) {
            //     navigate("/login")
            // }
        })
    }

    const handleChangePage = pageNo => {
        setPage(pageNo)
        getFlightData(pageNo);
    }

    const deleteHandler = async id => {
        const result = await confirm("Are you sure want to delete?");
        if (result) {
            axios.delete(`flights/admin/${id}`)
                .then(res => {
                    getFlightData(1);
                    toast.success("Successfully deleted!")
                })
                .catch(err => console.log(err));
            return;
        }

    }


    return <div className={`box`}>
        <Table disabledScroll autoHeight={true} data={airports}>
            <Column flexGrow={1}>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>Flight Number</HeaderCell>
                <Cell dataKey="flightNumber" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Departure Airport</HeaderCell>
                <Cell dataKey="departureAirport.code" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Arrival Airport</HeaderCell>
                <Cell dataKey="arrivalAirport.code" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Departure Date</HeaderCell>
                <Cell dataKey="flightSchedule.departureDate" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Departure Time</HeaderCell>
                <Cell dataKey="flightSchedule.departureTime" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>Arrival Date</HeaderCell>
                <Cell dataKey="flightSchedule.arrivalDate" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Arrival Time</HeaderCell>
                <Cell dataKey="flightSchedule.arrivalTime" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Available Seats</HeaderCell>
                <Cell dataKey="availableSeats" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Ticket Price</HeaderCell>
                <Cell dataKey="ticketPrice" />
            </Column>


            <Column flexGrow={1} align="right" fixed="right">
                <HeaderCell></HeaderCell>

                <Cell className={`table_action`} style={{ padding: '6px' }}>
                    {rowData => (
                        <>
                            <FaTrash className={`mx-2`} width={`0.5em`} onClick={() => deleteHandler(rowData.id)} />
                        </>
                    )}
                </Cell>
            </Column>
        </Table>

        <div style={{ padding: 20 }}>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                layout={['total', 'pager']}
                total={totalRecords}
                limitOptions={[10, 30, 50]}
                limit={limit}
                activePage={page}
                onChangePage={handleChangePage}
            />
        </div>

    </div>
}

export default FlightList;