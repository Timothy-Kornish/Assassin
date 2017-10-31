let latitudeToFeet = 364724.56917613005 // in Missoula
let longitudeToFeet = 250131.5464035199 // in Missoula

const dist = (x1,y1,x2,y2) => {
  x1 *= latitudeToFeet
  x2 *= latitudeToFeet
  y1 *= longitudeToFeet
  y2 *= longitudeToFeet
  let dist = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2,2))
  return dist
}

let person00 = [46.8656510, -113.9776997] // latitude, longitude
let person01 = [46.8663421, -113.9771954] // y, x
let person20 = [46.8656088, -113.9776878]
let person21 = [46.8663548, -113.9771735]

const vector =(player1X, player1Y, player2X, player2Y) =>{
		let x = player1X - player2X ;
		let y = player1Y  - player2Y ;
		const vecLen = Math.sqrt(Math.pow(x, 2) + Math.pow(y,2))
		x = x / vecLen ;
		y = y / vecLen ;
		return {xVector : player2X + x, yVector: player2Y + y}
	}

const createArrowAngle = (obj) => {
  let theta = Math.atan2(obj.xVector, obj.yVector)
  return theta
}

const createArrowCoords = (theta) => {
  let r = 5
  let x1 =0
  let y1 =0
  let x2 = r * Math.cos(theta).toFixed(1)
  let y2 = r * Math.sin(theta).toFixed(1)
  return {x1, y1, x2, y2}
}

let coords = vector(person01[0], person01[1], person21[0], person21[1])
console.log(coords)
console.log(dist(person01[0], person01[1], person21[0], person21[1]))
let theta = createArrowAngle(coords)
console.log(createArrowCoords(theta))
