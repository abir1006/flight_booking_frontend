import {useEffect, useState} from "react";
import {Pagination, Table} from 'rsuite';
import axios from "../../configs/axios";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";

const {Column, HeaderCell, Cell} = Table;

const Airports = () => {

    const [airports, setAirports] = useState([])
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0)

    useEffect(() => {
        getAirportData(page);
    }, []);

    const getAirportData = page => {
        page = page-1;
        axios.get(`/airports/paged?page=${page}&size=${limit}`).then(res => {
            setAirports(res.data?.content);
            setTotalRecords(res.data?.totalElements);
        })
    }

    const handleChangePage = pageNo => {
        setPage(pageNo)
        getAirportData(pageNo);
    }

    // const data = airports?.filter((v, i) => {
    //     const start = limit * (page - 1);
    //     const end = start + limit;
    //     return i >= start && i < end;
    // });


    return <div className={`box`}>
        <Table disabledScroll autoHeight={true} data={airports}>
            <Column width={60}>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id"/>
            </Column>

            <Column width={350}>
                <HeaderCell>Airport Name</HeaderCell>
                <Cell dataKey="name"/>
            </Column>

            <Column>
                <HeaderCell>Code</HeaderCell>
                <Cell dataKey="code"/>
            </Column>

            <Column width={150}>
                <HeaderCell>City</HeaderCell>
                <Cell dataKey="city"/>
            </Column>

            <Column width={250}>
                <HeaderCell>Country</HeaderCell>
                <Cell dataKey="country"/>
            </Column>

            <Column width={80} align="center" fixed="right">
                <HeaderCell></HeaderCell>

                <Cell style={{padding: '6px'}}>
                    {rowData => (
                        <>
                            <FaEdit className={`mx-2`} width={`0.5em`} onClick={() => alert(`id:${rowData.id}`)}/>
                            <FaTrash className={`mx-2`} width={`0.5em`} onClick={() => alert(`id:${rowData.id}`)}/>
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
                layout={['pager']}
                total={totalRecords}
                limitOptions={[10, 30, 50]}
                limit={limit}
                activePage={page}
                onChangePage={handleChangePage}
            />
        </div>

    </div>
}

export default Airports;