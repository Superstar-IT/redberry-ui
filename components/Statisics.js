import React, { useEffect } from "react";
import { connect } from "react-redux";
import Router, { useRouter } from 'next/router'
import MUIDataTable from 'mui-datatables';
import { Typography, Grid } from '@material-ui/core';
import HomeMsg from "../i18n/home.json";

const Statistics = ({ token, statistics }) => {
    const { locale } = useRouter();

    useEffect(() => {
        if(!token) Router.push('/login');
    }, [token])

    if(!statistics.length) {
        return <Typography>No Data</Typography>
    }

    const columns = [
        { 
            name: 'country', 
            label: HomeMsg.country[locale], 
            options: {
                sort: true,
                sortThirdClickReset: true, 
                filter: true,
                customBodyRenderLite: index => statistics[index].country.name[locale],
            } 
        },
        {
            name: 'confirmed',
            label: HomeMsg.confirmed[locale],
            options: {
                sort: true,
                sortThirdClickReset: true, 
                filter: true,
            }
        },
        {
            name: 'recovered',
            label: HomeMsg.recovered[locale],
            options: {
                sort: true,
                sortThirdClickReset: true, 
                filter: true,
            }
        },
        {
            name: 'death',
            label: HomeMsg.death[locale],
            options: {
                sort: true,
                sortThirdClickReset: true, 
                filter: true,
            }
        }
    ]
    const options = {
        filter: false,
        search: true,
        searchBox: true,
        print: false,
        download: false,
        viewColumns: false,
        checkBox: false,
        selectableRows: false,
        pagination: true,
        customSearch: (searchQuery, currentRow, columns) => {
            const keyword = searchQuery.toLowerCase();
            let result = false;
            let i = 0;
            while(!result && i < currentRow.length) {
                if (currentRow[i] === null) result = false;
                if (typeof currentRow[i] === "object") {
                    result = currentRow[i].name[locale].toString().trim().toLowerCase().includes(keyword);
                } else if (currentRow[i].toString().toLowerCase().includes(keyword)) { 
                    result = true;
                }
                i++;
            }
            return result;
        },
        customSort: (data, colIndex, order, meta) => {
            if(colIndex === 0) {
                return data.sort((a, b) => {
                    const left = a.data[colIndex].name[locale].toLowerCase();
                    const right = b.data[colIndex].name[locale].toLowerCase();
                    if(order === 'desc') {
                        return right > left ? 1 : -1
                    } else {
                        return right > left ? -1 : 1
                    }
                })
            } else {
                return data.sort((a, b) => order === 'desc' ?  b.data[colIndex] - a.data[colIndex] : a.data[colIndex] - b.data[colIndex] )
            }
        }
    };

    return (
        <Grid>
            { typeof window !== 'undefined'
                && <MUIDataTable title={HomeMsg.statistics[locale]} data={statistics} columns={columns} options={options} />
            }
        </Grid>
    )

}

const mapStateToProps = state => {
    return { 
        token: state.auth.token,
        statistics: state.statistics.statistics,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
