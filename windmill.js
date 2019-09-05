export default (p) => {
  let pivot = null
  let angle = 0

  const radius = 12

  const offset = 48

  const lineLength = p.windowWidth
  const resolution = 0.002
  const speed = 0.02

  const points = []
  const angles = []

  function calculateAngles() {
    for (let i = 0, { length } = points; i < length; i += 1) {
      angles[i] = p.atan2(
        points[i].pos.y - pivot.y, points[i].pos.x - pivot.x
      )

      if (angles[i] < resolution) {
        angles[i] += p.PI
      }
    }
  }

  function circle({ pos, counter }, color = 'white') {
    p.fill(color)
    p.circle(pos.x, pos.y, radius)

    if (counter) {
      p.fill('white')
      p.stroke(1)
      p.text(counter, pos.x - (radius / 3), pos.y - radius)
    }
  }

  function createPoint() {
    return {
      counter: 0,
      pos: p.createVector(
        p.random(offset, p.width - offset), p.random(offset, p.height - offset)
      )
    }
  }

  function reset() {
    points.length = 0

    for (let i = 0; i < 16; i += 1) {
      points.push(createPoint())
    }

    const point = points[p.floor(p.random() * 10)]
    point.counter += 1
    pivot = point.pos

    calculateAngles()
  }

  function setup() {
    p.createCanvas(p.windowWidth - offset, p.windowHeight - offset)
    p.frameRate(24)

    p.textSize(12)

    reset()
  }

  function draw() {
    p.background(0)

    points.forEach((point) => {
      circle(point)
    })

    p.stroke(255)
    p.strokeWeight(2)
    p.line(
      pivot.x + p.cos(angle) * lineLength,
      pivot.y + p.sin(angle) * lineLength,
      pivot.x - p.cos(angle) * lineLength,
      pivot.y - p.sin(angle) * lineLength
    )

    circle({ pos: pivot }, 'red')

    angle += speed
    if (angle > p.PI) {
      angle -= p.PI
    }

    for (let s = 0; s < speed; s += resolution) {
      for (let i = 0, { length } = points; i < length; i += 1) {
        if (
          angles[i] > angle + s
          && angles[i] < angle + s + resolution
        ) {
          pivot = points[i].pos
          points[i].counter += 1

          calculateAngles()

          break
        }
      }
    }
  }

  p.play = function() {
    p.loop()
  }
  p.stop = function() {
    p.noLoop()
  }

  p.reset = reset

  p.setup = setup
  p.draw = draw
}
