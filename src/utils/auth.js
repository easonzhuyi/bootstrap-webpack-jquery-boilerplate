import Cookies from 'js-cookie'

const TokenKey = 'accessKey'
const code = 'companyCode'
const Id = 'custId'
const insurance = 'insurance'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 存入公司code
export function setCode (companyCode) {
  return Cookies.set(code, companyCode)
}

// 导出code
export function getCode () {
  return Cookies.get(code)
}

// 删除code
export function removeCode () {
  return Cookies.remove(code)
}

// 存入custId
export function setId (id) {
  return Cookies.set(Id, id)
}

// 取出id
export function getId (id) {
  return Cookies.get(Id)
}

// 转换状态
export function formatIdentity (status) {
  const statusMap = {
    1: '出生证',
    2: '驾照',
    3: '军官证',
    4: '其他',
    5: '港澳台回乡证/通行证',
    6: '护照',
    7: '户口簿',
    8: '社保卡',
    9: '身份证',
    10: '外国人永久居留证'
  }
  return statusMap[status]
}

// 存入保险责任
export function setInsurance (data, index = '') {
  return localStorage.setItem(`${insurance}${index}`, JSON.stringify(data))
}

// 取出保险责任
export function getInsuranceItem (index = '') {
  return JSON.parse(localStorage.getItem(insurance + index))
}

// 删除本地保险责任
export function removeInsurance (index = '') {
  return localStorage.removeItem(insurance + index)
}

// 插入数组值的转换
export function insertValue (forms, blankForm, pageName, formName) {
  const newArr = []
  forms.map(form => {
    const obj = JSON.parse(JSON.stringify(blankForm))
    Object.keys(form).map(key => {
      if (obj[pageName][formName][key]) {
        obj[pageName][formName][key].value = form[key]
      }
    })
    newArr.push(obj)
  })
  return newArr
}
