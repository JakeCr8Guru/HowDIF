import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    marginTop: "2vh",
  },
  chart: {
    width: "90vh",
    height: "70vh",
  },
});

const CalendarChart = (props) => {

  const classes = useStyles();

  const history = useHistory();

  const [data, setData] = useState([]);

  const { emotionsToDate } = props;

  // You should always add elements inside your render scope
  // to the second array parameter of useEffect to prevent unexpected bugs.
  useEffect(() => {
    setData(emotionsToDate);
  }, [setData, emotionsToDate]);


  // If data is undefined it errors out
  const startDate = () => {
    const start = emotionsToDate[0].day;
    console.log('This is the start date', start);
    return start;
  }

  // If data is undefined it errors out
  const endDate = () => {
    const date = emotionsToDate.length - 1;
    const end = emotionsToDate[date].day;
    console.log("This is the end date", end);
    return end;
  };

  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={8}>
            <Typography variant="h3" gutterBottom>
              Emotions to Date
            </Typography>
            <Button variant="contained" onClick={() => history.push("/home")}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box component="div" className={classes.chart}>
              <ResponsiveCalendar
                data={data}
                from={startDate()} // Will have to turn these into a function some how...
                to={endDate()}
                emptyColor="#eeeeee"
                colors={[
                  "#61cdbb",
                  "#32936F",
                  "#e8c1a0",
                  "#f47560",
                  "#F4E04D",
                  "#587792",
                  "#CBDFBD",
                  "#A53860",
                ]}
                minValue={0}
                maxValue={9}
                indexBy="emotion"
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                monthLegendPosition="after"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "row",
                    translateY: 36,
                    itemCount: 6,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: "right-to-left",
                  },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("Here is Redux store state:", state); // state
  console.log("Here is Redux ownProps:", ownProps); // ownProps
  return {
    emotionsToDate: state.emotionLog.emotionsToDate,
  };
};

export default connect(mapStateToProps)(CalendarChart);
