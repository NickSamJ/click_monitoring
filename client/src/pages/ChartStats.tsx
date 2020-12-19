import React, { useContext, useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { AppContext } from "../App";
import Paper from "@material-ui/core/Paper";
import { scaleBand } from "@devexpress/dx-chart-core";
import _ from "lodash";
import Select from "@material-ui/core/Select";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { ArgumentScale } from "@devexpress/dx-react-chart";
import useStyles from "../styles/Style";

interface dayData {
  hour: string;
  clicksCount: number;
}

const ChartStats = () => {
  const classes = useStyles();

  const data = useContext(AppContext);
  const [dataForChart, setDataForChart] = useState<dayData[]>([]);
  const [date, setDate] = useState(new Date());
  const [totalClicks, setTotalClicks] = useState(0);
  const [domains, setDomains] = useState<string[]>([]);
  const [currentDomain, setCurrentDomain] = useState<string>();
  const [today, setToday] = useState(new Date());

  const generateDataForChart = () => {
    const todayClicks = data.clicks.filter((click) => {
      if (!currentDomain) {
        return (
          new Date(click.date).toLocaleDateString() ===
          date.toLocaleDateString()
        );
      } else {
        return (
          click.date.toLocaleDateString() === date.toLocaleDateString() &&
          click.domain === currentDomain
        );
      }
    });
    setTotalClicks(todayClicks.length);

    const res: dayData[] = _(todayClicks)
      .groupBy((click) => {
        return new Date(click.date).getHours();
      })
      .map((value, key) => ({ hour: key + ":00", clicksCount: value.length }))
      .value();
    setDataForChart(res);
  };

  useEffect(() => {
    setDomains(
      data.clicks.reduce((acc, curr) => {
        if (!acc.includes(curr.domain) && curr.domain !== undefined) {
          acc.push(curr.domain);
        }
        return acc;
      }, [] as string[])
    );
  }, [data]);
  useEffect(() => {
    generateDataForChart();
  }, [currentDomain, date, data]);

  const dayCheckForm = (
    <form
      // className={classes.container}
      noValidate
    >
      <FormControl className={classes.formControl}>
        <TextField
          id="date"
          type="date"
          defaultValue={
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate()
          }
          onChange={(e) => {
            setDate(new Date(e.target.value));
            generateDataForChart();
          }}
          inputProps={{
            max:
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate(),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>Check Day</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          value={currentDomain ? currentDomain : ""}
          label="Check domain"
          onChange={(e) => setCurrentDomain(e.target.value as string)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {domains.map((domain) => (
            <MenuItem key={domain} value={domain}>
              {domain}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Check domain</FormHelperText>
      </FormControl>
    </form>
  );

  return (
    <>
      <Container>
        <Typography variant="h3" component="h3">
          Chart Statistics
        </Typography>
        total clicks: ({totalClicks}){dayCheckForm}
        <Paper>
          <Chart data={dataForChart}>
            <Title text="Average daily clicks by hours" />
            <ArgumentScale factory={scaleBand} />

            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
              valueField="clicksCount"
              argumentField="hour"
              name="clicksCount"
            />
          </Chart>
        </Paper>
      </Container>
    </>
  );
};

export default ChartStats;
