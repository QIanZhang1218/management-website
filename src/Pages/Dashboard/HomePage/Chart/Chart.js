import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,  Legend, ResponsiveContainer } from 'recharts';
import Title from '../Title/Title';
import axios from "axios";
export default function Chart() {
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = React.useState();
    useEffect(() => {
        axios.get( "/api/AdminManagement/GetMostPopularBookLIst",).then(response => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <React.Fragment>
            <Title>Most Popular Books of the Month</Title>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bookName" />
                    <YAxis dataKey="bookBorrowTimes"  />
                    <Legend />
                    <Bar dataKey="bookBorrowTimes" barSize={40} fill="#3f51b5" label={"Book Borrow Times"}/>
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}