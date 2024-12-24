/* MagicMirror²
 * Module: MMM-AirQuality
 *
 * By Ira theobold https://github.com/bluerhodfa
 * MIT Licensed.
 */

const NodeHelper = require('node_helper')
const helper = require('./fetch_api_data')

module.exports = NodeHelper.create(helper)
