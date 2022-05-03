import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import defaultCredentials from "./defaultCredentials";

const getTrustSchemes = (credentials, setCredentials) => {
    fetch("/identity").then(res => res.json()).then(res => {
        const idRaka = res.find(r => r.name === "raiffeisen").pubkey;
        const idDeutschePost = res.find(r => r.name === "deutschepost").pubkey;
        const newCredentials = Object.assign(credentials);
        newCredentials.solvencyVC.raka.issuer.id = idRaka;
        newCredentials.ageVC.deutschepost.issuer.id = idDeutschePost;
        setCredentials(newCredentials);
    })
}


export default function PaymentForm({state, setState}) {
    const [credentials, setCredentials] = useState(defaultCredentials);
    useEffect(() => {
        getTrustSchemes(credentials, setCredentials);
    }, [])

    const handleChange = (e) => {
        if (credentials.solvencyVC.raka.id === e.target.value) {
            setState(s => ({...s, solvencyVC: credentials.solvencyVC.raka}));

        } else if (credentials.solvencyVC.fake.id === e.target.value) {
            setState(s => ({...s, solvencyVC: credentials.solvencyVC.fake}));
        } else {
            setState(s => ({...s, solvencyVC: {id: 0}}));
        }
    }
    const handleChange2 = e => {
        setState(s => ({...s, order: {...s.order, paymentCondition: e.target.value}}))
    }
    const handleChange3 = e => {
        if (credentials.ageVC.deutschepost.id === e.target.value) {
            setState(s => ({...s, ageVC: credentials.ageVC.deutschepost}));


        } else {
            setState(s => ({...s, ageVC: {id: 0}}));
        }
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth={true}>
                        <InputLabel id="demo-simple-select-helper-label">Solvency Credential</InputLabel>
                        <Select
                            label="Solvency Credential"
                            value={state.solvencyVC.id}
                            onChange={handleChange}
                        >

                            <MenuItem value="0">
                                <em>None</em>
                            </MenuItem>

                            <MenuItem value={credentials.solvencyVC.raka.id}>Raiffeisen Bank</MenuItem>
                            <MenuItem value={credentials.solvencyVC.fake.id}>Fake Bank</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth={true}>
                        <InputLabel id="demo-simple-select-helper-label">Payment Condition</InputLabel>
                        <Select
                            label="Payment Condition"
                            value={state.order.paymentCondition}
                            onChange={handleChange2}
                        >
                            <MenuItem value={"CashOnDelivery"}>Cash On Delivery</MenuItem>
                            <MenuItem value={"CashInAdvance"}>Cash In Advance</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>


            </Grid>
            <Typography variant="h6" mt={3} gutterBottom>
                Age verification
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl variant="standard" fullWidth={true}>
                        <InputLabel id="demo-simple-select-helper-label">Age Credential</InputLabel>
                        <Select
                            label="Age credential"
                            value={state.ageVC.id}
                            onChange={handleChange3}
                        >
                            <MenuItem value={0}>None</MenuItem>
                            <MenuItem value={credentials.ageVC.deutschepost.id}>Deutsche Post</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
