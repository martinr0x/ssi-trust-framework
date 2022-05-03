import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import credentials from "./defaultCredentials";


export default function Shoppingcart({products, setProducts}) {

    const onChange = (product) => e => {
        setProducts(s => ({
            ...s,
                order: {
                ...s.order,
                items :products.map(p => p.name == product.name ? {...product, qty: e.target.value} : p)
            }})
        );
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shopping Cart
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{py: 1, px: 0}}>
                        <ListItemText primary={product.name} secondary={product.desc} style={{width: "75%"}}/>
                        <FormControl variant="standard" style={{minWidth: "100px", marginRight: "10px"}}>
                            <InputLabel>Quantity</InputLabel>
                            <Select
                                label="Quantity"
                                value={product.qty}
                                onChange={onChange(product)}
                            >
                                {[0, 1, 2, 5, 10, 15, 20, 50, 100, 1000].map(d => (<MenuItem value={d}>{d}</MenuItem>))}
                            </Select>

                        </FormControl>
                        <Typography variant="body2">{(product.qty * product.price).toFixed(2) + "€"} </Typography>
                    </ListItem>
                ))}

                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        {products.reduce((a, b) => a + (b.qty * b.price), 0).toFixed(2) + "€"}
                    </Typography>
                </ListItem>
            </List>


        </React.Fragment>
    );
}
