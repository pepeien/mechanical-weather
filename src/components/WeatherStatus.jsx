import { useSelector } from 'react-redux';

//Icons
import {
    clearDayIcon,
    clearNightIcon,
    cloudIcon,
    cloudyDayIcon,
    cloudyNightIcon,
    rainingIcon,
    unknownIcon
} from '../assets/images/icons';

const electron = window.require('electron');

const availableStatusList = {
    "clearDay": clearDayIcon,
    "clearNigth": clearNightIcon,
    "cloudy": cloudIcon,
    "cloudyDay": cloudyDayIcon,
    "cloudyNight": cloudyNightIcon,
    "raining": rainingIcon,
    "unknown": unknownIcon
};

const WeatherStatus = () => {
    const getWeatherInfo = () => {
        const weatherInfo = electron.ipcRenderer.sendSync('get-weather-info', selectedPortInfo.path);

        return weatherInfo;
    };

    const selectedPortInfo = useSelector(state => state.portInfo),
          weatherInfo = selectedPortInfo.path ?  getWeatherInfo() : "unknown";


    return(
        <div className="weather-status --full-width  --flex --centralize">
            {availableStatusList[weatherInfo]}
        </div>
    );
};

export default WeatherStatus;