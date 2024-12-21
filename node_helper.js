/* MagicMirror²
 * Module: MMM-AirQuality
 *
 * By Ira theobold https://github.com/bluerhodfa
 * MIT Licensed.
 */

const NodeHelper = require("node_helper")
const Log = require("logger");

module.exports = {
  notifications: {
    DATA: 'AIR_QUALITY_DATA',
    DATA_RESPONSE: 'AIR_QUALITY_DATA_RESPONSE',
  },

  start: function () {
    console.log('AirQuality helper started ...')
  },
}
