import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { AppContext } from "../App";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const data = useContext(AppContext);
  const [domainClicks, setDomainClicks] = useState<
    { domain: string; clicks: number }[]
  >();

  useEffect(() => {
    const domainStats = _(data.clicks)
      .groupBy((click) => {
        return click.domain;
      })
      .map((value, key) => ({ domain: key, clicks: value.length }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10)
      .value();
    setDomainClicks(domainStats);
  }, [data]);
  return (
    <>
      <Typography variant="h3" component="h3">
        Welcome to Dashboard!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4">
              clicks: <span>{data.clicks.length}</span>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h4">Domains click statistics</Typography>
            <List component="nav" aria-label="secondary mailbox folders">
              {domainClicks &&
                domainClicks.map((domain, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText>
                        <strong>{domain.domain}: </strong> {domain.clicks}
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;
