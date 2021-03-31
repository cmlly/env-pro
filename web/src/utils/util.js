export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['欢迎回来!', '祝你答辩顺利！']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}

// 格式化JSON
export function jsonStringfy (data, param) {
  return JSON.stringify(data, (key, val) => {
    if (key === param) {
      return btoa(encodeURI(val))
    }
    return val
  })
}

// 解析JSON
export function jsonParse (data, param) {
  return JSON.parse(data, (key, val) => {
    if (key === param) {
        return decodeURI(atob(val))
    }
    return val
  })
}

// 倒计时
export function countDown (date) {
    const nowtime = new Date()
    const endtime = new Date(date)
    const lefttime = endtime.getTime() - nowtime.getTime()
    const leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)) // 计算天数
    const lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24) // 计算小时数
    const leftm = Math.floor(lefttime / (1000 * 60) % 60) // 计算分钟数
    const lefts = Math.floor(lefttime / 1000 % 60) // 计算秒数
    if (leftd <= 0) {
      return `${lefth}:${leftm}:${lefts}`
    } else {
      return `${leftd}天${lefth}:${leftm}:${lefts}`
    }
}
