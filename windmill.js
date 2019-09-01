export default (p) => {
  const points = []

  const len = 600

  function circle({ x, y }) {
    p.fill('white')
    p.circle(x, y, 10)
  }

  function createPoint() {
    return Object.assign(
      p.createVector(
        p.int(p.random(p.width - 100)),
        p.int(p.random(p.height - 100))
      ),
      { isPivot: false }
    )
  }

  function findPivot() {
    return points.find((point) => point.isPivot)
  }

  function checkDist(a, b, c) {
    const dist = (a, b) => p.dist(a.x, a.y, b.x, b.y)

    const d1 = dist(a, c)
    const d2 = dist(b, c)
    const d3 = dist(a, b)

    const round = (value) => Math.round(value * 100) / 100

    return (
      (round(d1+d2) === round(d3))
      || (round(d1+d2) < round(d3) + 0.02)
    )
  }

  function removePivot() {
    points.forEach((point) => {
      point.isPivot = false
    })
  }

  function setup() {
    p.createCanvas(len, len)

    for (let i = 0; i < 2; i += 1) {
      points.push(createPoint())
    }

    points[p.floor(p.random() * points.length)].isPivot = true

    p.frameRate(24)

    p.noLoop()
  }

  function draw() {
    p.background('lightGray')

    points.forEach((point) => {
      circle(point)
    })

    const pivot = findPivot()

    p.push()
    p.translate(pivot.x, pivot.y)

    const radians = p.radians(p.frameCount)

    p.rotate(radians)
    p.line(len * -1, 0, len, 0)
    p.pop()

    let sp = null
    let ep = null

    sp = p5.Vector.fromAngle(radians, len).add(pivot.x, pivot.y)
    ep = p5.Vector.fromAngle(radians, len).mult(-1).add(pivot.x, pivot.y)

    for (
      let i = 0, length = points.length; i < length; i += 1
    ) {
      if (!points[i].isPivot) {
        const distance = checkDist(sp, ep, points[i])
        if (distance) {
          removePivot()
          points[i].isPivot = true
          break
        }
      }
    }
  }

  p.setup = setup
  p.draw = draw
}
