import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {LoadingButton} from '@mui/lab';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import PaymentForm from './PaymentForm';
import Review from './Review';

import AlertTitle from "@mui/material/AlertTitle";

import { v4 as uuidv4 } from 'uuid';
import Shoppingcart from "./Shoppingcart";
import Divider from "@mui/material/Divider";
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shopping cart', 'Order details', 'Review your order'];

const items = [
    {
        name: 'Fish & Chips',
        desc: 'Snack',
        qty: 1,
        price: 9.99,
    },
    {
        name: 'Fine Wine',
        desc: 'Alcoholic Beverage',
        qty: 1,
        price: 3.45,
    },
    {
        name: 'Cheese Cake',
        desc: 'Dessert',
        qty:1,
        price: 6.51,
    },
    {
        name: 'Broccoli',
        desc: 'Vegetable',
        qty: 1,
        price: 14.11,
    }
]

const theme = createTheme();

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const orderTrustEvaluation = (order) => {
    let order1 ={};
    if(order.solvencyVC.id === 1 || order.solvencyVC.id === 0 || order.solvencyVC.id == null){

    }else{
        order1.solvencyVC = order.solvencyVC;
    }
    if(order.ageVC.id === 1 || order.ageVC.id === 0  || order.ageVC.id == null){

    }else {
        order1.ageVC = order.ageVC;
    }
    order1.order = order.order

    order1.order.orderValue.value = order.order.items.reduce((a,b) => a + ( b.qty * b.price), 0);
    order1.order.ageVerificationRequired = order.order.items[1].qty > 0;
    return ({
        input: order1
    })
}
export default function Checkout() {
    const [order, setOrder] = React.useState({
        order: {
            "ageVerificationRequired":false,
            "paymentCondition": "CashOnDelivery",
            "id": uuidv4(),
            "items": items,
            "orderValue": {
                "value":0,
                "currency": "EUR"
            }
        },
        solvencyVC: {},
        ageVC: {}
    });
   const  getStepContent = (step)  =>{
        switch (step) {
            case 0:
                return <Shoppingcart setProducts={setOrder} products={order.order.items}/>;
            case 1:
                return <PaymentForm setState={setOrder} state={order}/>;
            case 2:
                return <Review state={order}/>;
            default:
                throw new Error('Unknown step');
        }
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleNext = () => {
        setLoading(true);
        if (activeStep === steps.length - 1) {

            postData('/v1/data/webshop/isOrderTrusted', orderTrustEvaluation(order))
                .then(data => {
                    setLoading(false);
                    if (data.result) {
                        setActiveStep(activeStep + 1);
                    } else {
                        setError(true);
                    }
                });
        } else {
            setActiveStep(activeStep + 1);
            setLoading(false);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>

            <CssBaseline/>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Food & Beverages Company
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}

                                    <LoadingButton
                                        loading={loading}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </LoadingButton>

                                </Box>
                                {error && <Box textAlign={"left"} mt={2}>
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        The order is not <b>trusted</b> and cannot be processed further!</Alert>
                                </Box>}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright/>
            </Container>
        </ThemeProvider>
    );
}
