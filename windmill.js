export default (p) => {

  function setup() {
    p.noLoop()
  }

  function draw() {
    console.log('draw')
  }

  p.setup = setup
  p.draw = draw
}
