# MMM-AirQuality

 MagicMirror² module to display Air Pollution data from <https://OpenWeatherMap.org>

 Based on <https://github.com/CFenner/MMM-AirQuality>

![Example of MMM-AirQuality](./AirQualityImage.png)
![with header location ](./AirQualityImage1.png)

## Module description

MagicMirror module to display Air Pollution data from OpenWeatherMap.org
You will require a One Call API key from <https:/openweathermap.org/api>, subscription required with 1,000 API calls per day for free

## Installation

### Install

In your terminal, go to your [MagicMirror²][mm] Module folder and clone MMM-AirQuality:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/bluerhodfa/MMM-AirQuality.git
npm install
```

### Update

```bash
cd ~/MagicMirror/modules/MMM-AirQuality
git pull
```

## Using the module

To use this module, add the following as a minimum to the modules array in the `config/config.js` file:

```js
{
 module: "MMM-AirQuality",
 position: "top_right",
 config: {
    appId: "{your openweathermap.org api key}",
    location: "Oban",                   // Location
    lat: "56.4127",                     // Latitude of your location (Oban in this example)
    lon: "-5.4706",                     // Longitude of your location
 }
},
```

## Configuration options

Option|Default|Description
------|------|-----------
`appId`|not available| openweathermap.org API key (required)
`location`|not available| location to show Air Quality Index values
`lat`|numeric format nn.nnnn| latitude of the location (Required)
`lon`|numeric format nn.nnnn| longitude of the location (Required)
`apiBase`|"api.apenweathermap.org/data/"| openweathermap.org base url (default)
`apiVersion`|"2.5"| openweathermap.org base url version (default)
`apiEndPoint`|"/air_pollution"| openweathermap.org base url endpoint (default)
`initialDelay`| 0 | delay before requesting data
`showLocation`| true | include location in header
`showIndex`| true |  display AQI
`appendLocationNameToHeader`| true  |  display location in header
`animationSpeed`| 1000 |  DOM animation speed

## Sending notifications to the module

Notification|Description
------|-----------
`AIR_QUALITY_DATA`| Request Payload
`AIR_QUALITY_DATA_RESPONSE`| Receive response

## Developer commands

- `npm install` - Install devDependencies like ESLint.
- `npm run lint` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
