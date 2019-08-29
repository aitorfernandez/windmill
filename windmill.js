export default (p) => {
  function getWidth() {
    return p.windowWidth
  }

  function getHeight() {
    return p.windowHeight
  }

  function setup() {
    p.createCanvas(getWidth(), getHeight())

    p.frameRate(1)
  }

  function draw() {
    p.background(255)

    p.push()
    p.translate(getWidth() / 2, getHeight() / 2)
    p.rotate(p.frameCount / 500)
    polygon(0, 0, 50, 2)
    p.pop()
  }

  function polygon(x, y, radius, vertices) {
    let angle = p.TWO_PI / vertices

    p.beginShape()
    for (let i = 0; i < p.TWO_PI; i += angle) {
      let vx = x + p.cos(i) * radius
      let vy = y + p.sin(i) * radius

      p.vertex(vx, vy)
    }
    p.endShape(p.CLOSE)
  }

  p.setup = setup
  p.draw = draw
}
