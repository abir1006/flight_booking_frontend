import {useEffect, useState} from "react";
import {Pagination, Table} from 'rsuite';
import axios from "../../../configs/axios";
import {FaTrash} from "react-icons/fa6";
import {confirm} from "react-confirm-box";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const {Column, HeaderCell, Cell} = Table;

const BookingList = () => {

    const [passengers, setBookings] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getBookingData(page);
    }, [page]);

    const getBookingData = page => {
        page = page - 1;
        axios.get(`bookings/paged?page=${page}&size=${limit}`)
            .then(res => {
                setBookings(res.data?.content);
                setTotalRecords(res.data?.totalElements);
            })
            .catch(err => {
                console.log(err)
                // if (err.response.status === 500) {
                //     navigate("/login")
                // }
            });
    };

    const handleChangePage = pageNo => {
        setPage(pageNo);
    };

    const deleteHandler = async id => {
        const result = await confirm("Are you sure want to delete?");
        if (result) {
            axios.delete(`bookings/${id}`)
                .then(res => {
                    getBookingData(1);
                    toast.success("Successfully deleted!")
                })
                .catch(err => console.log(err));
            return;
        }

    }



    return (
        <div className="box">
            <Table disabledScroll autoHeight={true} data={passengers}>
                <Column width={50}>
                    <HeaderCell>ID</HeaderCell>
                    <Cell dataKey="id"/>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Booking Date</HeaderCell>
                    <Cell dataKey="bookingDate"/>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Flight ID</HeaderCell>
                    <Cell dataKey="flightIds"/>
                </Column>

                <Column flexGrow={2}>
                    <HeaderCell>Trip Type</HeaderCell>
                    <Cell dataKey="tripType"/>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Total Price</HeaderCell>
                    <Cell dataKey="totalPrice"/>
                </Column>

                <Column flexGrow={2}>
                    <HeaderCell>Booking Status</HeaderCell>
                    <Cell dataKey="status"/>
                </Column>

                <Column flexGrow={1} align="right" fixed="right">
                    <HeaderCell></HeaderCell>
                    <Cell className="table_action" style={{padding: '6px'}}>
                        {rowData => (
                            <>
                                <FaTrash className="mx-2" width="0.5em" onClick={() => deleteHandler(rowData.id)}/>
                            </>
                        )}
                    </Cell>
                </Column>
            </Table>

            <div style={{padding: 20}}>
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
    );
};

export default BookingList;
