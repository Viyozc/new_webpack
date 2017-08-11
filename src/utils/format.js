/**
 * Created by fanli on 2017/5/8.
 */

//限制字节数
function dateFormat (date, flag, isShowDetail) {
  let newDate = ''
  if(!isShowDetail){
    // 不带时分秒
    let year = date.getFullYear(),
      month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    newDate = year + flag + month + flag + date

  }else {
    // 带时分秒
    let year = date.getFullYear(),
      month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
      hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
      minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
      second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    newDate = year + flag + month + flag + date +
        ' ' + hour + ':' + minutes + ':' + second
  }
  return newDate
}

export {
  dateFormat
}
