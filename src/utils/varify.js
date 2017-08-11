/**
 * Created by fanli on 2017/5/8.
 */

//身份证号码验证
function isCardId (idcard) {
  let Errors = new Array(
    '验证通过!',
    '身份证号码位数不对!',
    '身份证号码出生日期超出范围或含有非法字符!',
    '身份证号码校验错误!',
    '身份证地区非法!',
    '身份证输入有误!'
  )
  let area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: 'xingjiang',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }

  let isPass = false
  let Y, JYM
  let S, M
  let idcard_array = new Array()
  let ereg
  idcard_array = idcard.split('')
//地区检验
  if (area[parseInt(idcard.substr(0, 2))] == null) isPass = false
//身份号码位数及格式检验
  switch (idcard.length) {
    case   15:
      if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0   )) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$///测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$///测试出生日期的合法性
      }
      if (ereg.test(idcard)) isPass = true
      else isPass = false
      break
    case   18:
//18位身份号码检测
//出生日期的合法性检查
//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0   )) {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$///闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$///平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {//测试出生日期的合法性
//计算校验位
        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
          + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
          + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
          + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
          + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
          + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
          + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
          + parseInt(idcard_array[7]) * 1
          + parseInt(idcard_array[8]) * 6
          + parseInt(idcard_array[9]) * 3
        Y = S % 11
        M = 'F'
        JYM = '10X98765432'
        M = JYM.substr(Y, 1)//判断校验位
        if (M == idcard_array[17].toUpperCase()) {
          isPass = true   //检测ID的校验位
        } else {
          isPass = false
        }

      }
      else isPass = false
      break
    default:
      isPass = false
      break
  }

  return {pass: isPass, tip: '身份证号码校验不通过'}
}

//是否为手机号码
function isPhone (phone) {
  let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  return phoneReg.test(phone)
}

//限制字节数
function limitWordLength (str, len) {
  let r = 0
  let isPass = false
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
    // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
    if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
      r += 1
    } else {
      r += 2
    }
  }
  if (r <= len) {
    isPass = true
  }
  return isPass
}

export {
  isCardId,
  isPhone,
  limitWordLength
}
