const moment = require('moment');
const mongoose = require('mongoose');
const Device = mongoose.model('Devices');

function serializeDate(date, daysAdded = 0) {
  if (date.includes('-')) {
    if (daysAdded > 0)
      return moment.utc(date).add(daysAdded, 'day').format()
    return moment.utc(date).format();
  } else {
    if (daysAdded > 0)
      return moment.unix(date).add(daysAdded, 'day').format()
    return moment.unix(date).utc().format();
  }
}

exports.list_devices = function(req, res) {
  Device.aggregate([{
    "$group": {
      "_id": "$device_id",
      "dates": { $push: "$epoch_time" }
    },
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$arrayToObject": {
          "$concatArrays": [
            [{
              "k": "$_id",
              "v": "$dates"
            }]
          ]
        }
      }
    }
  }], function(err, devices) {
    if (err)
      res.send(err);
    result = Object.assign({}, ...devices);
    res.json(result);
  });
}

exports.list_devices_with_date = function(req, res) {
  startDate = new Date(serializeDate(req.params.date));
  endDate = new Date(serializeDate(req.params.date, 1));

  Device.aggregate([{
    "$match": {
      "epoch_time": {
        "$gte": startDate,
        "$lt": endDate
      }
    }
  }, {
    "$group": {
      "_id": "$device_id",
      "dates": { $push: "$epoch_time" }
    },
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$arrayToObject": {
          "$concatArrays": [
            [{
              "k": "$_id",
              "v": "$dates"
            }]
          ]
        }
      }
    }
  }], function(err, devices) {
    if (err)
      res.send(err);
    result = Object.assign({}, ...devices);
    res.json(result);
  });
}

exports.list_devices_with_dates = function(req, res) {
  startDate = new Date(serializeDate(req.params.from));
  endDate = new Date(serializeDate(req.params.to));

  Device.aggregate([{
    "$match": {
      "epoch_time": {
        "$gte": startDate,
        "$lt": endDate
      }
    }
  }, {
    "$group": {
      "_id": "$device_id",
      "dates": { $push: "$epoch_time" }
    },
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$arrayToObject": {
          "$concatArrays": [
            [{
              "k": "$_id",
              "v": "$dates"
            }]
          ]
        }
      }
    }
  }], function(err, devices) {
    if (err)
      res.send(err);
    result = Object.assign({}, ...devices);
    res.json(result);
  });
}

exports.delete_devices = function(req, res) {
  Device.remove({}, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
}

exports.list_device_ids = function(req, res) {
  Device.distinct('device_id', function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
}

exports.read_device = function(req, res) {
  Device.aggregate([{
    "$match": {
      "device_id": req.params.deviceId
    }
  }, {
    "$group": {
      "_id": "$device_id",
      "dates": { $push: "$epoch_time" }
    },
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$arrayToObject": {
          "$concatArrays": [
            [{
              "k": "$_id",
              "v": "$dates"
            }]
          ]
        }
      }
    }
  }], function(err, device) {
    if (err)
      res.send(err);
    res.json(device[0]);
  });
};

exports.read_device_with_date = function(req, res) {
  startDate = new Date(serializeDate(req.params.date));
  endDate = new Date(serializeDate(req.params.date, 1));

  Device.aggregate([{
    "$match": {
      "device_id": req.params.deviceId,
      "epoch_time": {
        "$gte": startDate,
        "$lt": endDate
      }
    }
  }, {
    "$group": {
      "_id": "$device_id",
      "dates": { $push: "$epoch_time" }
    },
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$arrayToObject": {
          "$concatArrays": [
            [{
              "k": "$_id",
              "v": "$dates"
            }]
          ]
        }
      }
    }
  }], function(err, device) {
    if (err)
      res.send(err);
    res.json(device[0]);
  });
};

exports.read_device_with_dates = function(req, res) {
  startDate = new Date(serializeDate(req.params.from));
  endDate = new Date(serializeDate(req.params.to));

  Device.distinct("epoch_time", {
    "device_id": req.params.deviceId,
    "epoch_time": {
      "$gte": startDate,
      "$lt": endDate
    }
  }, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
}

exports.create_device_with_date = function(req, res) {
  var newDateFormat = serializeDate(req.params.date);
  var newDevice = new Device({
    device_id: req.params.deviceId,
    epoch_time: newDateFormat
  });

  newDevice.save(function(err, ping) {
    if (err)
      res.send(err);
    res.json(ping);
  });
};
