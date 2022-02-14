import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { useRouter } from "next/router";
import { Typography, Button, TextField, Grid, Link  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { LoginSchema } from "../schemas/login.schema";
import { login, register } from "../store/actions/authAction";
import Errors from "../i18n/errors.json";
import LoginMsg from "../i18n/login.json";

const useStyles = makeStyles(() => ({
    root: { 
        height: '100vh',
    },
    textField: {
        marginBottom: 16,
    }
}))

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { locale } = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            isLogin ? dispatch(login(values)) : dispatch(register(values));
            setSubmitting(false);
        },
      });
    
    const hadleLoginToggle = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
    }
    
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" className={classes.root}>
            <Grid item>
                <Typography component="h1" variant="h5">{ isLogin ? LoginMsg.login[locale] : LoginMsg.register[locale] }</Typography>
            </Grid>
            <Grid item>
                <form>
                    <TextField
                        fullWidth
                        id="userName"
                        name="userName"
                        label={LoginMsg.username[locale]}
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName && Errors[formik.errors.userName][locale]}
                        className={classes.textField}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label={LoginMsg.password[locale]}
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password && Errors[formik.errors.password][locale]}
                        className={classes.textField}
                    />
                    <Grid container direction="row" alignItems="center" className={classes.textField}>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={hadleLoginToggle}>{isLogin ? LoginMsg.addUser[locale] : LoginMsg.goLogin[locale]}</Link>
                        </Grid>
                    </Grid>
                    <Button color="primary" variant="contained" fullWidth onClick={formik.handleSubmit}>
                        { isLogin ? LoginMsg.login[locale] : LoginMsg.register[locale] }
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = {
    login,
    register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)