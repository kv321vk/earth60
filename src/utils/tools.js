
/**
 * 判断未定义
 * @param {*} v
 */
const isUndef = v => {
  return v === undefined || v === null
}
/**
 * 判断泛对象类型
 * @param {*} obj
 */
const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}
/**
 * 判断数组类型
 * @param {*} arr
 */
const isArray = arr => {
  return Array.isArray(arr)
}
/**
 * 判断空对象
 * @param {*} obj
 */
const isEmptyObj = obj => {
  if (!isObject(obj)) {
    return false
  }
  if (isArray(obj)) {
    return obj.length === 0
  } else {
    for (let key in obj) {
      return false
    }
    return true
  }
}
/**
 * 首字母大写
 * @param {*} str
 */
export const firstUpperCase = str => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
/**
 * 首字母小写
 * @param {*} str
 */
export const firstLowerCase = str => str.replace(/( |^)[A-Z]/g, (L) => L.toLowerCase())
/**
 * 深复制数组
 * @param {*} arr
 */
const deepCopyArr = arr => {
  return arr.map(item => {
    return isArray(item) ? deepCopyArr(item) : (
      isObject(item) ? deepCopyObj(item) : item
    )
  })
}
/**
 * 深复制对象
 * @param {*} obj
 */
export const deepCopyObj = obj => {
  return Object.keys(obj).reduce((newObj, item) => {
    return {
      ...newObj,
      [item]: isArray(obj[item]) ? deepCopyArr(obj[item]) : (
        isObject(obj[item]) ? deepCopyObj(obj[item]) : obj[item]
      )
    }
  }, {})
}
/**
 * 数组转大写
 * @param {*} arr
 * @param {*} exception
 */
const arrayCapitalize = (arr, exception) => {
  return arr.map(item => {
    if (isArray(item)) {
      return arrayCapitalize(item, exception)
    } else if (isObject(item)) {
      return objectCapitalize(item, exception)
    } else {
      return item
    }
  })
}
/**
 * 对象键首字母大写
 * @param {*} obj
 * @param {*} exception
 */
export const objectCapitalize = (obj, exception) => {
  return Object.keys(obj).reduce((newObj, item) => {
    let key = (exception && exception.test(item)) ? item : firstUpperCase(item)
    return {
      ...newObj,
      [key]: isArray(obj[item]) ? arrayCapitalize(obj[item]) : (
        isObject(obj[item]) ? objectCapitalize(obj[item]) : obj[item]
      )
    }
  }, {})
}
/**
 * 数组转小写
 * @param {*} arr
 * @param {*} exception
 */
const arrayUncapitalize = (arr, exception) => {
  return arr.map(item => {
    if (isArray(item)) {
      return arrayUncapitalize(item, exception)
    } else if (isObject(item)) {
      return objectUncapitalize(item, exception)
    } else {
      return item
    }
  })
}
/**
 * 对象键首字母小写
 * @param {*} obj
 * @param {*} exception
 */
export const objectUncapitalize = (obj, exception) => {
  return Object.keys(obj).reduce((newObj, item) => {
    let key = (exception && exception.test(item)) ? item : firstLowerCase(item)
    return {
      ...newObj,
      [key]: isArray(obj[item]) ? arrayUncapitalize(obj[item]) : (
        isObject(obj[item]) ? objectUncapitalize(obj[item]) : obj[item]
      )
    }
  }, {})
}

/**
 * 数组去空
 * @param {*} arr
 */
const arrayEmptyFilter = arr => {
  let newArray = []
  arr.map(item => {
    if (!(isUndef(item) || isEmptyObj(item) || item === '')) {
      if (isObject(item)) {
        let _obj = isArray(item) ? arrayEmptyFilter(item) : objectEmptyFilter(item)
        if (!isEmptyObj(_obj)) {
          newArray.push(_obj)
        }
      } else {
        newArray.push(item)
      }
    }
  })
  return newArray
}

/**
 * 对象去空
 * @param {*} obj
 */
export const objectEmptyFilter = obj => {
  return Object.keys(obj).reduce((newObj, item) => {
    if (isUndef(obj[item]) || isEmptyObj(obj[item]) || obj[item] === '') {
      return { ...newObj }
    } else {
      if (isObject(obj[item])) {
        let _obj = isArray(obj[item]) ? arrayEmptyFilter(obj[item]) : objectEmptyFilter(obj[item])
        if (!isEmptyObj(_obj)) {
          return { ...newObj, [item]: _obj }
        } else {
          return { ...newObj }
        }
      } else {
        return { ...newObj, [item]: obj[item] }
      }
    }
  }, {})
}

/**
 * 请求参数传数组转对象
 * @param {*} arr
 */
export const postArr2Obj = arr => {
  return arr.reduce((newObj, item, index) => {
    return {
      ...newObj,
      [index]: item
    }
  }, {})
}

/**
 * 自动添加零
 * @param {*} str
 */
const fillZero = str => {
  return (str < 10) ? '0' + str : str
}
/**
 * 非常规日期转换
 * @param {*} dateSrc
 */
export const dateConvert = dateSrc => {
  if (isUndef(dateSrc) || dateSrc === '') {
    return ''
  }
  let _date = new Date(dateSrc)
  if (_date) {
    let year = _date.getFullYear()
    let month = fillZero(_date.getMonth() + 1)
    let date = fillZero(_date.getDate())
    let hours = fillZero(_date.getHours())
    let minutes = fillZero(_date.getMinutes())
    let seconds = fillZero(_date.getSeconds())
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
  }
  return ''
}
/**
 * 获取每年第一天的datetime
 */
export const firstDayOfYear = (() => {
  let date = new Date()
  date.setDate(1)
  date.setMonth(0)
  return date
})()
/**
 * 截取xxxx-xx-xx xx:xx格式时间
 * @param {*} dateString
 */
export const getDateAndTime = dateString => {
  if (!dateString) return '--'
  let date = dateString.split(' ')[0]
  let time = dateString.split(' ')[1]
  return date + ' ' + time.split(':')[0] + ':' + time.split(':')[1]
}
/**
 * 截取xxxx-xx-xx格式时间
 * @param {*} dateString
 */
export const getDate = dateString => {
  if (!dateString) return '--'
  let date = dateString.split(' ')[0]
  return date
}
/**
 * 清空对象
 * @param {*} obj
 */
export const clearObject = obj => {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = ''
    }
  }
}
/**
 * 返回上一页
 */
export const prevRouter = () => {
  let arr = JSON.parse(localStorage.getItem('breadcrumb')) || []
  if (arr.length > 1) {
    arr.pop()
  }
  console.log(arr, 'localStorage breadcrumb')
  localStorage.setItem('breadcrumb', JSON.stringify(arr))
  return arr[arr.length - 1]['url']
}
// /**
//  * 清空对象，包含数字，字符串，对象，数组
//  * @param {*} obj
//  */
// TODO 清空对象
// export const clearAll = obj => {
//   let newObj = {}
//   clear(obj)
//   function clear(obj) {
//     for (let key in obj) {
//       if (typeof box === 'string') {
//         newObj[key] = ''
//       } else if (typeof obj[key] === 'number') {
//         newObj[key] = 0
//       } else if (typeof obj[key] === 'object' && obj[key]) {// 排除null
//         if (Array.isArray(obj[key])) {// 数组
//           obj[key].map((item, index) => {
//
//           })
//         } else {// 对象
//
//         }
//       }
//     }
//   }
// }

/**
 * 数组拍平
 */
export const arrFlatten = (arr) => {
  return arr.reduce(function (pre, cur) {
    if (!Array.isArray(cur)) {
      return [...pre, cur]
    } else {
      return [...pre, ...arrFlatten(cur)]
    }
  }, [])
}

/**
 *累加器，累加对象属性的值(乘以100再除以100。防止丢失精度)
 */
export const accumulator = (arr, attr) => {
  return arr.reduce((total, current) => {
    return round(((total * 100 + current[attr] * 100) / 100), 2)
  }, 0)
}

/**
 * 保留小数位
 * @param number
 * @param precision
 * @returns {number}
 */
export const round = (number, precision) => Math.round(+number + 'e' + precision) / Math.pow(10, precision)

/**
 *数组中对象求和
 */
export const complexAc = (arr, attr) => {
  let init = Object.assign({}, ...Object.keys(arr[0][attr]).map(item => {
    return {[item]: 0}
  }))
  let tempArr = arr.map(item => item[attr])
  let res = tempArr.reduce((sum, cur) => {
    let arrsss = Object.keys(sum).map(it => {
      sum[it] = round(((sum[it] * 100 + cur[it] * 100) / 100), 2)
      return sum
    })
    return arrsss[0]
  }, init)
  return res
}

/**
 * 数组结构转换
 * @param arr 待转化的数组
 * @param detail 二级内容的数组名的key
 * @param title 一级内容的名称的key
 * @param name 二级内容的名称的key
 */
export const transferArrayStructure = function (arr, detail, title, name) {
  let nArr = arr.map(item => {
    return item[detail].map(value => {
      value.tempName = item[title]
      return value
    })
  })
  let obj = {}
  nArr.forEach(item => {
    item.forEach(value => {
      let key = value[name]
      if (!obj[key]) {
        obj[key] = []
      }
      value[name] = value.tempName
      delete value.tempName
      obj[key].push(value)
    })
  })
  let dataList = []
  for (let i in obj) {
    let object = {}
    object[title] = i
    object[detail] = obj[i]
    dataList.push(object)
  }
  return dataList
}
/**
 * 字符串首字母小写
 * @param str
 * @returns {*}
 */
export const firstWordLowerCase = (str) => {
  if (!str) {
    return false
  }
  return str.charAt(0).toLowerCase() + str.substr(1)
}
/**
 * 金钱格式转换
 * @param num
 * @param accuracy
 * @returns {string}
 */
export const toCurrencyString = (num, accuracy = 2) => {
  return (num * 1).toFixed(accuracy).replace(/\d(?=(?:\d{3})+\b)/g, '$&,')
}
/**
 * 时间获取前面到日期
 */
export const toDate = (datetime) => {
  return datetime.split(' ')[0]
}
