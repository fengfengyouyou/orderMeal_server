
function formartDate(timestamp, type, week) {
    var time
    if (!timestamp) {
        time = new Date()
    }else{
        time = new Date(timestamp)

    }
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var w = time.getDay()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    var result = ''
    var numberChinese = '日一二三四五六'
    switch (type) {
      case 'year':
        result = y
        break
      case 'month':
        result = y + '-' + add0(m)
        break
      case 'day':
        result = y + '-' + add0(m) + '-' + add0(d)
        break
      case 'hour':
        result = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h)
        break
      case 'minutes':
        result = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm)
        break
      case 'seconds':
        result = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
        break
      case 'all':
        result = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
        break
  
      default:
        result = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
        break
    }
    if (week) {
      result += ' 星期' + numberChinese[w]
    }
    return result
  }
  function add0(m) {
    return m < 10 ? '0' + m : m
  }
  function interval(v, sign = '|') {
    if (!v) {
      return ''
    }
    return ` ${sign} ${v}`
  }
  console.log(formartDate())
  module.exports = {
      formartDate,
      interval,
      add0
  }
  