# pingService

Requirements:

* Install NodeJs – https://nodejs.org/en/download/package-manager/
* Install MongoDB – https://docs.mongodb.com/manual/installation/
* Install Ruby – https://www.ruby-lang.org/en/documentation/installation/

Versions:

* node -v [v9.9.0]
* mongod --version [v3.6.3]
* ruby -v [2.4.3]

# Process

After cloning/downloading project change into /pingService directory and run the following commands to start:

```
$ mongod --dbpath /data/db
$ npm run start
```

To see ruby test results run: `$ ruby pings.rb`

| Method   | Action                 | Description   |
| :------- | :--------------------- | :------------ |
| GET      | /all                   | Returns all devices |
| GET      | /all/:date             | Returns all devices with specific date |
| GET      | /all/:from/:to         | Returns all devices with specific dates |
| GET      | /devices               | Returns all distinct device_ids |
| GET      | /:deviceId             | Returns device with dates |
| GET      | /:deviceId/:date       | Returns device with list of specific date |
| GET      | /:deviceId/:from/:to   | Returns device with list of specific dates |
| POST     | /:deviceId/:date       | Creates device with specific date |
| POST     | /clear_data            | Deletes all devices |

