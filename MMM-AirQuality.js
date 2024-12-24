/* MagicMirror²
 * Module: MMM-AirQuality
 *
 * By Ira theobold https://github.com/bluerhodfa
 * MIT Licensed.
 */

Module.register("MMM-AirQuality", {

  defaults: {
    initialDelay: 0,
    updateInterval: 30, // every 30 minutes
    location: "",
    showLocation: true,
    appendLocationNameToHeader: true,
    animationSpeed: 1000,
    appId: "",
    lat: "",
    lon: "",
    apiBase: "api.openweathermap.org/data/",
    apiVersion: "2.5",
    apiEndPoint: "/air_pollution",
    debug:false
  },
  notifications: {
    DATA: "AIR_QUALITY_DATA",
    DATA_RESPONSE: "AIR_QUALITY_DATA_RESPONSE",
  },
  colours: {
    GOOD: '#009966',
    LOW: '#009966',
    FAIR: '#ffde33',
    MODERATE: '#ffde33',
    POOR: '#cc0033',
    HIGH: '#cc0033',
    UNHEALTHY_FOR_SENSITIVE_GROUPS: '#ff9933',
    VERY_POOR: '#ff0000',
    VERY_HIGH: '#ff0000',
    UNHEALTHY: '#cc0033',
    VERY_UNHEALTHY: '#660099',
    HAZARDOUS: '#7e0023',
    UNKNOWN: '#333333',
  },
  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["MMM-AirQuality.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start: function () {
    var self = this
      setInterval( function() {
        self.updateDom(); 
      }, 1000);

    Log.info(`Starting module: ${this.name}`)
    self.loaded = false

    if (this.config.apiBase !== '' && this.config.appId !== '') {
      setTimeout(function () {
        self.sendSocketNotification(self.notifications.DATA, {identifier: self.identifier, config: self.config })
      }, this.config.initialDelay * 1000)

    // set auto update
    setInterval(function () {
      self.sendSocketNotification(self.notifications.DATA, { identifier: self.identifier, config: self.config })
    }, this.config.updateInterval * 60 * 1000 + this.config.initialDelay * 1000)
  }
  },
  updateData: function (response) {
    this.loaded = true
    this.data.city = "Oban"
    this.data.value = response.list[0].main.aqi
    this.data.impact = this.getImpactUK(this.data.value)
    this.data.colour = this.colours[this.data.impact]
    this.data.so2 = response.list[0].components.so2
    this.data.no2 = response.list[0].components.no2
    this.data.pm2_5 = response.list[0].components.pm2_5
    this.data.pm10 = response.list[0].components.pm10
    this.data.o3 = response.list[0].components.o3
    this.data.co = response.list[0].components.co
    this.data.no = response.list[0].components.no
    this.data.nh3 = response.list[0].components.nh3

    console.log(`JSON response = `+JSON.stringify(response.list[0].main.aqi))
    console.log(`JSON response = `+JSON.stringify(response.list[0].components.so2))
  },
  getImpact: function (index) {
    // AQI default openweathermap impact
    if ( index == 1) return 'GOOD'
    if ( index == 2) return 'FAIR'
    if ( index == 3) return 'MODERATE'
    if ( index == 4) return 'POOR'
    if ( index == 5) return 'VERY POOR'
    return 'UNKNOWN'
  },
  getImpactUK: function (index) {
    // AQI default openweathermap impact for the UK
    if ( index < 4) return 'LOW'
    if ( index > 3 && index < 6) return 'MODERATE'
    if ( index > 6 && index < 9) return 'HIGH'
    if ( index == 10) return 'VERY HIGH'
    return 'UNKNOWN'
  },
//TODO: add europe, china, US impact
  // overide getHeader method
  getHeader: function () {
    let header = ''
    if (this.data.header !== '') {
      if (this.data.header === undefined) {
      header += this.translate('HEADER')
       } else {
      header += this.data.header
      }
    }

    if (this.loaded && this.config.appendLocationNameToHeader) {
      if (header !== '') {
        header += ' '
      }
      header += this.config.location
    }
    return header
  },
  gettemplate: function () {
    return `${this.name}.njk`
  },
  getTemplateData: function() {
    let message = ''
    if (this.config.appId === '') {
      message = `Please set an API key for ${this.name}<br>You can get one at <a href='https://api.openweather.org/'>https://api.openweathermap.org</a>`
    } else if (this.config.location ==='') {
      message = `Please set a location for ${this.name}!`
    }

    return {
      loaded: this.loaded,
      city: this.data.city,
      index: this.data.value,
      so2: this.data.so2,
      no2: this.dat.no2,
      pm2_5: this.data.pm2_5,
      pm10: this.data.pm10,
      o3: this.data.o3,
      co: this.data.co,
      impact: this.translate(this.data.impact),
      colour: this.data.colour,
      showLocation: this.config.showLocation && !this.config.appendLocationNameToHeader,
      showIndex: this.config.showIndex,
      labelLoading: this.translate('LOADING'),
      message
    }
  },
  getTranslations: function () {
    return {
      en: 'l10n/en.json',
      de: 'l10n/de.json',
    }
  },
  getScripts: function () {
    return ['https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.js'] 


  },
  getStyles: function () {
    return ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/all.min.css'] 
    return ["MMM-AirQuality.css"]
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    const self = this
    Log.debug('Received ' + notification)
    switch (notification) {
      case self.notifications.DATA_RESPONSE:
        if (payload.identifier === this.identifier) {
          if (payload.status === 'OK') {
            console.log('Data %o ', payload.payloadReturn)
            self.updateData(payload.payloadReturn)
            self.updataDom(this.animationSpeed)
          } else {
            console.log('DATA FAILED ' + payload.message)
          }
        }
        break
    }
    }
  },)