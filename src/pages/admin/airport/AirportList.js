import {useEffect, useState} from "react";
import {Pagination, Table} from 'rsuite';
import axios from "../../../configs/axios";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {confirm} from "react-confirm-box";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const {Column, HeaderCell, Cell} = Table;

const AirportList = () => {

    const [airports, setAirports] = useState([])
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        getAirportData(page);
    }, []);

    const getAirportData = page => {
        page = page - 1;
        axios.get(`/airports/paged?page=${page}&size=${limit}`).then(res => {
            setAirports(res.data?.content);
            setTotalRecords(res.data?.totalElements);
        }).catch( err => {
            console.log(err)
            // if (err.response.status === 500) {
            //     navigate("/login")
            // }
        })
    }

    const handleChangePage = pageNo => {
        setPage(pageNo)
        getAirportData(pageNo);
    }

    const deleteHandler = async id => {
        const result = await confirm("Are you sure want to delete?");
        if (result) {
            axios.delete(`airports/${id}`)
                .then(res => {
                    getAirportData(1);
                    toast.success("Successfully deleted!")
                })
                .catch(err => toast.error("This airport has flights, Please remove flights first"));
            return;
        }

    }


    return <div className={`box`}>
        <Table disabledScroll autoHeight={true} data={airports}>
            <Column width={50}>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id"/>
            </Column>

            <Column flexGrow={2}>
                <HeaderCell>Airport Name</HeaderCell>
                <Cell dataKey="name"/>
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Code</HeaderCell>
                <Cell dataKey="code"/>
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>City</HeaderCell>
                <Cell dataKey="city"/>
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Country</HeaderCell>
                <Cell dataKey="country"/>
            </Column>

            <Column flexGrow={1} align="right" fixed="right">
                <HeaderCell></HeaderCell>

                <Cell className={`table_action`} style={{padding: '6px'}}>
                    {rowData => (
                        <>
                            <FaTrash className={`mx-2`} width={`0.5em`} onClick={() => deleteHandler(rowData.id)}/>
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
}

export default AirportList;