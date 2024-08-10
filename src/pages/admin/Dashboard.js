import {BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid, PieChart, Pie} from 'recharts';
import {Tooltip} from "rsuite";

const Dashboard = () => {

    const data = [
        {
            name: 'QA',
            uv: 100,
            pv: 10,
            amt: 10,
        },
        {
            name: 'EA',
            uv: 100,
            pv: 50,
            amt: 50,
        },
        {
            name: 'JPA',
            uv: 100,
            pv: 30,
            amt: 30,
        },
        {
            name: 'UA',
            uv: 100,
            pv: 35,
            amt: 35,
        },
        {
            name: 'TUR',
            uv: 100,
            pv: 5,
            amt: 5,
        }
    ];

    return <div className={`box`}>
        <div className={`row`}>
            <div className={`col-4`}>

                <BarChart
                    width={400}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Bar dataKey="pv" fill="#8884d8" background={{fill: '#eee'}}/>
                </BarChart>

            </div>
        </div>
    </div>
}

export default Dashboard;