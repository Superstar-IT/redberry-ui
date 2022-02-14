import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Router, { useRouter } from 'next/router'
import { Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import CardItem from "../components/CartItem";
import Statistics from "../components/Statisics";
import { getStatistics, getSummary } from '../store/actions/statsAction';
import HomeMsg from "../i18n/home.json";

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: '2rem'
    },
    mb_2: {
        marginBottom: '2rem'
    }
}))
const Home = ({ token, summary, getSummary, getStatistics }) => {
    const classes = useStyles();
    const { locale } = useRouter();

    useEffect(() => {
        if(!token) return Router.push('/login');
        getSummary(token);
        getStatistics(token);
    }, [token, getSummary, getStatistics]);

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container direction="column">
                <Grid item container direction="row" spacing={3} className={classes.mb_2}>
                    {summary && Object.keys(summary).map((key) => (
                        <Grid key={key} item xs={12} sm={4}>
                            <CardItem title={HomeMsg[key][locale]} content={summary[key]} />
                        </Grid>
                    ))}
                </Grid>
                <Grid item>
                    <Typography variant='h5' className={classes.mb_2}>{HomeMsg.statistics_by_country[locale]}</Typography>
                    <Statistics />
                </Grid>
            </Grid>
        </Container>
        
    )
}

const mapStateToProps = state => {
    return { 
        token: state.auth.token,
        summary: state.statistics.summary,
    }
}

const mapDispatchToProps = {
    getSummary,
    getStatistics,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)