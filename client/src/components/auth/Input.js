import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import React from 'react'

const Input = ({half, name, label, autoFocus, type, handleChange, handleShowPaswrd}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPaswrd}>
                                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon /> }

                            </IconButton>
                        </InputAdornment>
                    )
                }: null}
            />

        </Grid>
    )
}

export default Input
