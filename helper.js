/* MagicMirror²
 * Module: MMM-AirQuality
 *
 * By Ira theobold https://github.com/bluerhodfa
 * MIT Licensed.
 */

module.exports = {
  notifications: {
    DATA: 'AIR_QUALITY_DATA',
    DATA_RESPONSE: 'AIR_QUALITY_DATA_RESPONSE',
  },
  start: function () {
    console.log('AirQuality helper started ...')
  },
  loadData: async function (payload) {
    const self = this
    const url = `https://${payload.config.apiBase}${payload.config.apiVersion}${payload.config.apiEndPoint}?lat=${payload.config.lat}&lon=${payload.config.lon}&appid=${payload.config.appId}`
    console.log(`AirQuality-Fetcher: ${url}`)

    const result = await fetch(url)
      .then(response => response.json())

    self.sendSocketNotification(self.notifications.DATA_RESPONSE, {
      payloadReturn: result,
      status: 'OK',
      identifier: payload.identifier,
    })
  },
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case this.notifications.DATA:
        console.log(`AirQuality-Fetcher: Loading data of ${payload.config.lat}, ${payload.config.lon} for module ${payload.identifier}`)
        this.loadData(payload)
        break
    }
  },
}