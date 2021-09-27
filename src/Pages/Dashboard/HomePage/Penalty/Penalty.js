import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import axios from "axios";
import moment from 'moment'

//top right penalty amount
function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Penalty() {
    const classes = useStyles();
    const [isLoading,setLoading] = useState(true);
    const [penalty,setPenalty] = useState();
    useEffect(() => {
        axios.get( "/api/AdminManagement/GetUnpaidPenalty",).then(response => {
            // setData(response.data);
            setPenalty(response.data.readerUnpaid);
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <Title>Unpaid Penalties</Title>
            <Typography component="p" variant="h4">
                ${penalty}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {moment().format('dddd')}&nbsp;&nbsp;{moment().format('DD-MM-YYYY')}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View Details
                </Link>
            </div>
        </React.Fragment>
    );
}