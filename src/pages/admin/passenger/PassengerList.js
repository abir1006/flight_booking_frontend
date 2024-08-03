import {useEffect, useState} from "react";
import {Pagination, Table} from 'rsuite';
import axios from "../../../configs/axios";
import {FaTrash} from "react-icons/fa6";
import {confirm} from "react-confirm-box";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const {Column, HeaderCell, Cell} = Table;

const PassengerList = () => {

    const [passengers, setPassengers] = useState([]);
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getPassengerData(page);
    }, [page]);

    const getPassengerData = page => {
        page = page - 1;
        axios.get(`admin/users/passengers?page=${page}&size=${limit}`)
            .then(res => {
                setPassengers(res.data?.content);
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
            axios.delete(`admin/users/${id}`)
                .then(res => {
                    getPassengerData(1);
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
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="firstname"/>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Last Name</HeaderCell>
                    <Cell dataKey="lastname"/>
                </Column>

                <Column flexGrow={2}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email"/>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Phone</HeaderCell>
                    <Cell dataKey="phone"/>
                </Column>

                <Column flexGrow={2}>
                    <HeaderCell>Address</HeaderCell>
                    <Cell dataKey="address"/>
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

export default PassengerList;
