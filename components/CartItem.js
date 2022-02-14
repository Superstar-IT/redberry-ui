import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main
    }
}))

const CardItem = ({ title, content }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography className={classes.title} variant="h5">{title}</Typography>
                <Typography variant="h6">{content}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardItem;