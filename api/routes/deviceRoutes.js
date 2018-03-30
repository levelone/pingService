'use strict';

module.exports = function(app) {
  var device = require('../controllers/deviceController');

  app.route('/all').get(device.list_devices)
  app.route('/all/:date').get(device.list_devices_with_date)
  app.route('/all/:from/:to').get(device.list_devices_with_dates)
  app.route('/clear_data').post(device.delete_devices)
  app.route('/devices').get(device.list_device_ids)

  app.route('/:deviceId').get(device.read_device)
  app.route('/:deviceId/:date').post(device.create_device_with_date)
  app.route('/:deviceId/:date').get(device.read_device_with_date)
  app.route('/:deviceId/:from/:to').get(device.read_device_with_dates)
}
