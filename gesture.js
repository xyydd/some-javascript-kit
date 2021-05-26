// 手势
let element = document.documentElement

export class Dispatcher {
  constructor(element) {
    this.element = element
  }
  dispatch (type, properties = {}) {
    let event = new Event(type)
    for (let name in properties) {
      event[name] = properties[name]
    }
    element.dispatchEvent(event)
  }
}

// 解耦  listen => recognize => dispatch

export class Listener {
  constructor (element, recognizer) {
    let isListeningMouse = false

    let contexts = new Map()

    element.addEventListener('mousedown', event => {
      let context = Object.create(null)

      contexts.set(`mouse${1 << event.button}`, context)

      recognizer.start(event, context)

      let mousemove = event => {
        // 0b11111 鼠标上五个键都按下
        // 0b00001 左键
        // 0b00010 中键
        let button = 1

        while (button <= event.buttons) {
          if (button & event.buttons) {
            // order of buttons & button property is not same
            let key
            if (button === 2) {
              key = 4
            } else if (button === 4) {
              key === 2
            } else {
              key = button
            }
            let ctx = contexts.get(`mouse${key}`)
            recognizer.move(event, ctx)
          }
          button = button << 1
        }
      }
      let mouseup = event => {
        let ctx = contexts.get(`mouse${1 << event.button}`)
        recognizer.end(event, ctx)
        contexts.delete(`mouse${1 << event.button}`)
        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
          isListeningMouse = false
        }
      }
      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        isListeningMouse = true
      }
    })

    const touchstart = element.addEventListener('touchstart', event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })

    const touchmove = element.addEventListener('touchmove', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.move(touch, context)
      }
    })

    const touchend = element.addEventListener('touchend', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.end(touch, context)
        contexts.delete(touch.identifier)
      }
    })

    const touchcancel = element.addEventListener('touchcancel', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.cancel(touch, context)
        contexts.delete(touch.identifier)
      }
    })

  }
}

export class Recognizer {
  constructor (dispatcher) {
    this.dispatch = dispatcher.dispatch
  }

  start (point, context) {
    context.startX = point.clientX, context.startY = point.clientY;

    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }]

    context.isTap = true

    context.isPan = false

    context.isPress = false

    context.handler = setTimeout(() => {
      context.isTap = false

      context.isPan = false

      context.isPress = true
      this.dispatch('pressstart')

      context.handler = null
    }, 500)
  }

  move (point, context) {
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isTap = false
      context.isPan = true
      context.isPress = false
      context.isVertical = Math.abs(dx) < Math.abs(dy)
      this.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
      clearTimeout(context.handler)
    }

    if (context.isPan) {
      this.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
    }

    context.points = context.points.filter(point => Date.now() - point.t < 500)

    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }

  end (point, context) {
    if (context.isTap) {
      this.dispatch('tap')
      clearTimeout(context.handler)
    }
    if (context.isPress) {
      this.dispatch('pressend')
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500)

    let dis, v
    if (!context.points.length) {
      v = 0
    } else {
      dis = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2)
      v = dis / (Date.now() - context.points[0].t)
    }

    if (v > 1.5) {
      this.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
      context.isFlick = true
    } else {
      context.isFlick = false
    }

    if (context.isPan) {
      this.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      })
    }


  }

  cancel (point, context) {
    clearTimeout(context.handler)
    this.dispatch('cancel')
  }

}

export function enableGesture (el) {
  new Listener(el, new Recognizer(new Dispatcher(el)))
}
