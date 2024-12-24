# MMM-AirQuality
 MagicMirror² module to display Air Pollution data from OpenWeatherMap.org


# MMM-AirQuality

![Example of MMM-AirQuality](./AirQualityImage.png)
![with header location ](./AirQualityImage.png)

[Module description]

## Installation

### Install

In your terminal, go to your [MagicMirror²][mm] Module folder and clone MMM-AirQuality:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/bluerhodfa/MMM-AirQuality.git
mpm install
```

### Update

```bash
cd ~/MagicMirror/modules/MMM-AirQuality
git pull
```

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```js
    {
        module: 'MMM-Template',
        position: 'lower_third'
    },
```

Or you could use all the options:

```js
    {
        module: 'MMM-Template',
        position: 'lower_third',
        config: {
            exampleContent: 'Welcome world'
        }
    },
```

## Configuration options

Option|Possible values|Default|Description
------|------|------|-----------
`exampleContent`|`string`|not available|The content to show on the page

## Sending notifications to the module

Notification|Description
------|-----------
`TEMPLATE_RANDOM_TEXT`|Payload must contain the text that needs to be shown on this module

## Developer commands

- `npm install` - Install devDependencies like ESLint.
- `npm run lint` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
