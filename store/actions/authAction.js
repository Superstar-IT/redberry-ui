import axios from "axios"
import Router, { useRouter } from "next/router"

import * as Types from "../types"
import * as Config from "../config"
import notifier from "../../services/notify.service";
import Errors from "../../i18n/errors.json";

export const login = (loginData) => dispatch => {
    const { locale } = Router.router;

    return axios.post(`${Config.statiscticsApi}/auth/login`, loginData)
        .then((res) => {
            const { data } = res;
            dispatch({
                type: Types.LOGIN_SUCCESS,
                payload: data
            })
            Router.push('/')
        }).catch((err) => {
            notifier.error(Errors.login_failed[locale]);
        })
}

export const register = (loginData) => dispatch => {
    const { locale } = Router.router;

    return axios.post(`${Config.statiscticsApi}/auth/register`, loginData)
        .then((res) => {
            const { data } = res;
            dispatch({
                type: Types.LOGIN_SUCCESS,
                payload: data
            })
            Router.push('/')
        }).catch((err) => {
            notifier.error(Errors.register_failed[locale]);
        })
}