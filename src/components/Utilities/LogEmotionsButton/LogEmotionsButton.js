import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dialog, Slide } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LogStage1 from "../LogStage1/LogStage1";
import LogStage2 from "../LogStage2/LogStage2";
import LogStage3 from "../LogStage3/LogStage3";
import LogStage4 from "../LogStage4/LogStage4";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogEmotionsButton = (props) => {
  // ----- Functional State with React useState Hook -----
  // primary_emotion - State default null
  const [primaryEmotion, setPrimaryEmotion] = useState(null);
  // intensity_emotion - State default null
  const [intensityEmotion, setIntensityEmotion] = useState(null);
  // intensity_level - State default 0
  const [intensityLevel, setIntensityLevel] = useState(0);
  // // how_feel - State default null
  const [howFeel, setHowFeel] = useState(null);
  // // why_feel - State default null
  const [whyFeel, setWhyFeel] = useState(null);

  // Stage state which will render the correct stage of the process of the emotion log
  // default is Stage 1 - Will begin at Stage 1
  const [stage, setStage] = useState(1);
  // Material-ui state for Dialog component rendering
  const [open, setOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const useStyles = makeStyles({
    root: {
      minWidth: "85vh",
      flexGrow: 1,
    },
  });

  // Proceed to next stage
  const nextStage = () => {
    setStage(stage + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Proceed to prev stage
  const prevStage = () => {
    setStage(stage - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStage(1);
    setActiveStep(0);
    setPrimaryEmotion(null);
    setIntensityEmotion(null);
    setIntensityLevel(0);
    setHowFeel(null);
    setWhyFeel(null);
  };

  const handleCloseAndDispatch = (emotionLog) => {
    console.log(emotionLog);
    props.dispatch({ type: "ADD_EMOTION_LOG", payload: emotionLog });
    handleClose();
  };

  const renderSwitch = () => {
    
    switch (stage) {
      case 1:
        return (
          <LogStage1
            handleClose={handleClose}
            nextStage={nextStage}
            activeStep={activeStep}
            classes={classes}
            theme={theme}
            primaryEmotion={primaryEmotion}
            setPrimaryEmotion={setPrimaryEmotion}
          />
        );
      case 2:
        return (
          <LogStage2
            handleClose={handleClose}
            prevStage={prevStage}
            nextStage={nextStage}
            activeStep={activeStep}
            classes={classes}
            theme={theme}
            primaryEmotion={primaryEmotion}
            intensityLevel={intensityLevel}
            setIntensityLevel={setIntensityLevel}
            intensityEmotion={intensityEmotion}
            setIntensityEmotion={setIntensityEmotion}
          />
        );
      case 3:
        return (
          <LogStage3
            handleClose={handleClose}
            prevStage={prevStage}
            nextStage={nextStage}
            activeStep={activeStep}
            classes={classes}
            theme={theme}
            primaryEmotion={primaryEmotion}
            intensityEmotion={intensityEmotion}
            howFeel={howFeel}
            setHowFeel={setHowFeel}
            whyFeel={whyFeel}
            setWhyFeel={setWhyFeel}
          />
        );
      case 4:
        return (
          <LogStage4
            handleClose={handleClose}
            handleCloseAndDispatch={handleCloseAndDispatch}
            prevStage={prevStage}
            activeStep={activeStep}
            classes={classes}
            theme={theme}
            primaryEmotion={primaryEmotion}
            intensityLevel={intensityLevel}
            intensityEmotion={intensityEmotion}
            howFeel={howFeel}
            whyFeel={whyFeel}
          />
        );
      default:
        console.log("This is a multi-stage dialog built with React.");
    }
  }

  const classes = useStyles();

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Log Emotion
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="form-dialog-title"
      >
        {/* ----- This is the start of the Dialog Area ----- */}
        {renderSwitch(stage)}
        {/* ----- This is the end of the Dialog Area ----- */}
      </Dialog>
    </div>
  );
};

export default connect()(LogEmotionsButton);
