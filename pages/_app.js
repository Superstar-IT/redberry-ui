import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Typography, Link, Grid } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LocaleSwitcher from '../components/LocaleSwitcher';
import theme from '../theme/theme';
import { wrapper } from "../store/store"

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.background.default,
    padding: '1rem',
    '&:hover': {
      textDecoration: 'none',
    }
  }
}))

function MyApp({ Component, pageProps }) {
  const classes = useStyles();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppBar position="relative">
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Link href='/' className={classes.header}>
              <Typography variant="h5" noWrap>RedBerry COVID</Typography>
            </Link>
            <LocaleSwitcher className={classes.header}/>
          </Grid>
        </AppBar>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
