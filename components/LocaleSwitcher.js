import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        textDecoration: 'none',
        color: theme.palette.background.default,
        padding: '1rem',
        textTransform: "uppercase",
      }
}))

const LocaleSwitcher = () => {
    const classes = useStyles()
    const { locales, locale, pathname, query, asPath } = useRouter();
    const otherLocales = locales.filter((l) => l !== locale);
   
    return (
      <>
        {otherLocales.map((locale) => {
          return (
            <Link
              key={locale}
              href={{ pathname, query }}
              as={asPath}
              locale={locale}
            >
              <a className={classes.header}><Typography variant="h5" noWrap>{locale}</Typography></a>
            </Link>
          );
        })}
      </>
    );
}

export default LocaleSwitcher;