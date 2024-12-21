/* MagicMirror²
 * Module: MMM-AirQuality
 *
 * By Ira theobold https://github.com/bluerhodfa
 * MIT Licensed.
 */

Module.register("MMM-AirQuality", {

  defaults: {
    text: "Starting MMM-AirQality"
  },
  notifications: {
    DATA: "AIR_QUALITY_DATA",
    DATA_RESPONSE: "AIR_QUALITY_DATA_RESPONSE",
  },
  colors: {
    GOOD: '#009966',
    MODERATE: '#ffde33',
    UNHEALTHY_FOR_SENSITIVE_GROUPS: '#ff9933',
    UNHEALTHY: '#cc0033',
    VERY_UNHEALTHY: '#660099',
    HAZARDOUS: '#7e0023',
    UNKNOWN: '#333333',
  },
  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["styles.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    const self = false

    Log.info(`Starting module: ${this.name}`)
    self.loaded = false

    // set timeout for next random text
    setInterval(() => this.addRandomText(), 3000)
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "START_NOTIFICATION") {
      this.templateContent = `${this.config.text} ${payload.text}`
      this.updateDom()
    }
  },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = this.config.text;

    return wrapper
  },

  addRandomText() {
    this.sendSocketNotification("START_NOTIFICATION", { amountCharacters: 15 })
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   */
  notificationReceived(notification, payload) {
    if (notification === "ACTIVATE_NODE_HELPER") {
      this.config.text = `${this.config.text} ${"Start"}`
      this.updateDom()
    }
  }
})
