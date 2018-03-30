'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  device_id: { type: String },
  epoch_time: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Devices', DeviceSchema);
