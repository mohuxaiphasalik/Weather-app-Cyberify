import { Fragment, useRef, useState } from "react";

import {
  faArrowRight,
  faArrowTurnDown,
  faCoffee,
  faInfo,
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import GetIconButton from "./get-icon-button";
import {
  getAllWeatherData,
  setAllWeatherDataToCurrentCity,
} from "../utilities/api-utilities";
import { setAllWeatherData } from "../store/weather-slice";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  // Alert,
} from "@material-ui/core";

const SearchBar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openErrorSnakeBar, setOpenErrorSnakeBar] = useState(false);
  const [openPleaseWaitSnakeBar, setOpenPleaseWaitSnakeBar] = useState(false);

  const handleClickToOpenInfoDialog = () => {
    setOpenInfoDialog(true);
  };

  const handleToCloseInfoDialog = () => {
    setOpenInfoDialog(false);
  };

  const handleClickToOpenErrorSnakeBar = () => {
    setOpenErrorSnakeBar(true);
  };

  const handleToCloseErrorSnakeBar = () => {
    setOpenErrorSnakeBar(false);
  };

  const handleClickToOpenPleaseWaitSnakeBar = () => {
    setOpenPleaseWaitSnakeBar(true);
  };

  const handleToClosePleaseWaitSnakeBar = () => {
    setOpenPleaseWaitSnakeBar(false);
  };

  function updateAllWeatherDataToCurrentCity() {
    if (inputRef.current !== null) {
      (inputRef.current as any).value = "";
    }

    try {
      handleClickToOpenPleaseWaitSnakeBar();

      setAllWeatherDataToCurrentCity(dispatch);
    } catch (error) {
      console.log("error catched");
      handleToClosePleaseWaitSnakeBar();
      handleClickToOpenErrorSnakeBar();
    }
  }

  async function updateAllWeatherData() {
    const searchedCityName = (inputRef.current as any).value;

    //actual code
    try {
      handleClickToOpenPleaseWaitSnakeBar();

      const allWeatherData = await getAllWeatherData(searchedCityName);
      dispatch(setAllWeatherData(allWeatherData));
    } catch (error) {
      console.log("error catched");
      handleToClosePleaseWaitSnakeBar();
      handleClickToOpenErrorSnakeBar();
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-between py-5">
        <div className="flex flex-row w-3/4">
          <div onClick={updateAllWeatherData}>
            <GetIconButton iconProp={faMagnifyingGlass} />
          </div>

          <input
            defaultValue={""}
            ref={inputRef}
            className="grow outline-none"
            type="text"
            placeholder="Enter name of city here"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                updateAllWeatherData();
              }
            }}
          />
        </div>

        <div className="flex flex-row">
          <div onClick={updateAllWeatherData}>
            <GetIconButton iconProp={faArrowRight} isHoverPrimaryColor={true} />
          </div>
          <div onClick={updateAllWeatherDataToCurrentCity}>
            <GetIconButton
              iconProp={faLocationCrosshairs}
              isHoverPrimaryColor={true}
            />
          </div>
          <div onClick={handleClickToOpenInfoDialog}>
            <GetIconButton iconProp={faInfo} isHoverPrimaryColor={true} />
          </div>
        </div>
      </div>
      <Dialog open={openInfoDialog} onClose={handleToCloseInfoDialog}>
        <DialogTitle>{"Application Info"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>Title: React Weather App</div>
            <div>Developed By: Junaid Hassan</div>
            <div>Developer Email: junaidhassan2211@gmail.com</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToCloseInfoDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        className="text-center"
        open={openErrorSnakeBar}
        autoHideDuration={5000}
        onClose={handleToCloseErrorSnakeBar}
        message="Unable to load data for given city. Please check city name and internet connection and try again."
      />

      <Snackbar
        className="text-center"
        open={openPleaseWaitSnakeBar}
        autoHideDuration={2000}
        onClose={handleToClosePleaseWaitSnakeBar}
        message="Loading data please wait..."
      />
    </div>
  );
};

export default SearchBar;
