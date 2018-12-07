export default function LocalStorageData(key) {
  this.key = key
}

LocalStorageData.prototype = {
  add: function (value) {
    this.value = value || [];
    let curTime = new Date().getTime();

    localStorage.setItem(this.key, JSON.stringify({data: value, time: curTime}))
  },
  get: function (exp) {
    let data = localStorage.getItem(this.key);

    //已过期
    if (data) {
      let dataObj = JSON.parse(data)
      let _data = dataObj.data

      if (exp) {
        if (Date.now() - dataObj.time > exp) {
          this.remove(this.key)
        } else {
          return _data
        }
      } else {
        return _data
      }

    }
  },
  remove: function (key) {
    localStorage.removeItem(key);
    return false
  },
  clear: function () {
    localStorage.clear();
  }
}

