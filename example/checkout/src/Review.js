import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';



export default function Review({state}) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {state.order.items.map((product) => (
                    <ListItem key={product.name} sx={{py: 1, px: 0}}>
                        <ListItemText primary={product.name} secondary={product.desc}/>
                        <Typography variant="body2">{(product.price * product.qty).toFixed(2) + "€"} </Typography>
                    </ListItem>
                ))}

                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        {state.order.items.reduce((a, b) => a + (b.qty * b.price), 0).toFixed(2) + "€"}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Age verification
                    </Typography>
                    <Grid container>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{"Age Verification Required"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{state.order.items[1].qty == 0 ? "No" : "Yes"}</Typography>
                            </Grid>
                        </React.Fragment>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{"Age Credential"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{state.ageVC.id == null || state.ageVC.id == 0 ? "Not Provided" : state.ageVC.issuer.name}</Typography>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Payment details
                    </Typography>
                    <Grid container>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{"Payment Condition"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{state.order.paymentCondition}</Typography>
                            </Grid>
                        </React.Fragment>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{"Solvency Credential"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    gutterBottom>{state.solvencyVC.id == null || state.solvencyVC.id == 0 ? "Not Provided" : state.solvencyVC.issuer.name}</Typography>
                            </Grid>
                        </React.Fragment>

                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
