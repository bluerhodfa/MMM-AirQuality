const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    if (notification === "ACTIVATE_NODE_HELPER") {
      const amountCharacters = payload.amountCharacters || 10
      const randomText = Array.from({ length: amountCharacters }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join("")
      this.sendSocketNotification("START_NOTIFICATION", { text: randomText })
    }
      Log.info("In node_helper.js");
  },
})
