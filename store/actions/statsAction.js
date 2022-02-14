import axios from "axios"

import * as Types from "../types"
import * as Config from "../config"
import notifier from "../../services/notify.service"

export const getSummary = (token) => dispatch => {
    axios.get(`${Config.statiscticsApi}/statistics/summary`, { headers: {  Authorization: `Bearer ${token}`} })
        .then((res) => {
            const { data } = res;
            dispatch({
                type: Types.SET_SUMMRAY,
                payload: data,
            })
        }).catch((err) => {
            notifier.error(`Failed to get statistics summary.`)
        })
}

export const getStatistics = (token) => dispatch => {
    axios.get(`${Config.statiscticsApi}/statistics`, { headers: {  Authorization: `Bearer ${token}`} })
        .then((res) => {
            const { data: { data } } = res;
            dispatch({
                type: Types.SET_STATISTICS,
                payload: data
            })
        }).catch((err) => {
            notifier.error(`Failed to get statistics of countries.`)
        })
}