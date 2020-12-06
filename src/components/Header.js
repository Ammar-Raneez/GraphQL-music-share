import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(2)
    }
}))

function Header() {
    const classes = useStyles();

    return (
        <AppBar color="secondary" position="fixed">
            <Toolbar>
                <HeadsetTwoTone />
                <Typography className={classes.title} variant="h6" component="h1">
                    Moosique Share
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
