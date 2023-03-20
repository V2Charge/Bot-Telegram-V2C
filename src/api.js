const axios = require('axios');
const { resolve } = require('bluebird');
const Promise = require('bluebird');

const timeoutValueDefault = 10000;

module.exports = {

  async getDeviceId(nombrecarga, auth) {

    return new Promise(async (resolve) => {
      var devId = "";

      devId = await axios.request({
        method: 'get',
        url: 'https://v2c.cloud/v2cservice/thirdparty/pairings/me',
        headers: {
          'apikey': auth
        }
      }).then(resp => {
        for (var i in resp.data) {
          if (resp.data[i].tag === nombrecarga) {
            devId = resp.data[i].deviceId;
            console.log(devId);
            resolve(devId);
          }
        }
      }).catch(err => console.error(err)); resolve(null);

    })
  },

  async getToken(chatid) {

    return new Promise(async (resolves, reject) => {
      var token = "";

      token = await axios.request({
        method: 'get',
        url: 'https://v2c.cloud/v2cservice/telegram/token?',
        params: {
          'chatbotId': chatid
        }
      }).then(resp => {
        if (chatid !== "") {
          token = resp.data;
          console.log(token);
          resolves(token);
        }
        else reject(new Error('things failed'))


      }).catch(err => console.error(err)); resolves(null);

    })
  },
  async getUserInfo(chatid, tokenkey) {

    return new Promise(async (resolve, reject) => {
      var userinfo = "";

      userinfo = await axios.request({
        method: 'get',
        url: 'https://v2c.cloud/v2cservice/telegram/info?',
        params: {
          'chatbotId': chatid
        }, headers: {
          'apikey': tokenkey
        }
      }).then(resp => {
        userinfo = resp.data;
        console.log(userinfo);
        resolve(userinfo);
      }).catch(err => console.error(err)); resolve(null);
    })
  },

  async updateUserData(chatid, tokenkey, deviceId, tag) {
    return new Promise(async (resolve) => {
      await axios.request({
        method: 'post',
        url: 'https://v2c.cloud/v2cservice/telegram/update?',
        params: {
          'chatbotId': chatid,
        },
        data: {
          deviceId: deviceId,
          name: tag
        },
        headers: {
          'apikey': tokenkey,
          'Content-Type': 'application/json'
        },
      }).then(resp => {
        console.log("Added Device");
        console.log(resp.data);
        resolve(true)
      }).catch(err => console.error(err)); resolve(false);
    })
  },


  async addToken(chatid, tokenkey) {
    return new Promise(async (resolve) => {
      await axios.request({
        method: 'post',
        url: 'https://v2c.cloud/v2cservice/telegram/token',
        params: {
          'chatbotId': chatid
        }, headers: {
          'apikey': tokenkey
        }
      }).then(resp => {
        console.log("Chat Id and Token Key added successfully");
        console.log(resp.data);
        resolve(true)
      }).catch(err => console.error(err)); resolve(false);
    })
  },

  async getPairings(token) {
    return new Promise(async (resolve) => {
      var pairings = "";
      pairings = await axios.get('https://v2c.cloud/kong/v2c_service/pairings/me', {
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        }
      }).then(resp => {
        console.log(resp.data);
        resolve(resp.data)
      }).catch(err => console.error(err)); resolve(null);
    })
  },

  async lockCharger(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/locked?',
        params: {
          deviceId: deviceId,
          value: '1'
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault,
      }).then(resp => {
        console.log("lock successfully");
        console.log(resp.data);
        resolve(true)
      }).catch(err => console.error(err)); resolve(false);
    })
  },
  async unlockCharger(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/locked?',
        params: {
          deviceId: deviceId,
          value: '0'
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault,
      }).then(resp => {
        console.log("unlock successfully");
        console.log(resp.data);
        resolve(true)
      }).catch(err => console.error(err)); resolve(false);
    })
  },
  async pauseCharger(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/pausecharge?',
        params: {
          deviceId: deviceId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault,
      }).then(resp => {
        console.log("pause successfully");
        console.log(resp.data);
        resolve(true)
      }).catch(err => console.error(err)); resolve(false);
    })
  },
  async resumeCharger(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.request({
        method: 'post',
        url: 'https://v2c.cloud/kong/v2c_service/device/startcharge?',
        params: {
          deviceId: deviceId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault,
      }).then(resp => {
        console.log("resume successfully");
        console.log(resp.data);
        resolve(true)
      }).catch(err => console.error(err)); resolve(false);
    })
  },
  async reported(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.get('https://v2c.cloud/kong/v2c_service/device/reported?', {
        params: {
          "deviceId": deviceId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault
      }).then((resp) => {
        console.log("get reported successfully");
        console.log(resp.data);
        resolve(resp.data)
      }).catch(err => console.error(err)); resolve(null);
    })
  },
  async currentstatecharge(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.request('https://v2c.cloud/kong/v2c_service/device/currentstatecharge?', {
        method: 'post',
        params: {
          "deviceId": deviceId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault
      }).then((resp) => {
        console.log("current state charge successfully");
        console.log(resp.data);
        resolve(resp.data)
      }).catch(err => console.error(err)); resolve(null);
    })
  },
  async stadistics(token, deviceId) {
    return new Promise(async (resolve) => {
      await axios.get('https://v2c.cloud/kong/v2c_service/stadistic/device?', {
        params: {
          "deviceId": deviceId
        },
        headers: {
          'Content-type': 'application/json',
          'apikey': token
        },
        timeout: timeoutValueDefault
      }).then((resp) => {
        console.log("stadistics");
        console.log(resp.data);
        resolve(resp.data)
      }).catch(err => console.error(err)); resolve(null);
    })
  },

}

