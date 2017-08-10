export default class ServerFunk{
  constructor(list, username){
    this.list = list
    this.username = username
    this.listObj = this._organize(this.list)

    this.target = this.listObj[username].target

    this.user1X = this.listObj[username].longitude
    this.user1Y = this.listObj[username].latitude
    this.user2X = this.listObj[this.target].longitude
    this.user2Y = this.listObj[this.target].latitude

    this.distance = this.dist(this.user1X, this.user1Y, this.user2X, this.user2Y)
    this.theta = this.vectorAngle(this.user1X, this.user1Y, this.user2X, this.user2Y)
  }
  _organize(arr){
    for(var i = 0; i < arr.length; i++){
  		arr[i]  = arr[i].username
  	}
    return arr
  }

  dist(x1,y1,x2,y2){
    let latitudeToFeet = 364724.56917613005 // in Missoula
    let longitudeToFeet = 250131.5464035199 // in Missoula
    x1 *= latitudeToFeet
    x2 *= latitudeToFeet
    y1 *= longitudeToFeet
    y2 *= longitudeToFeet
    let newDist = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2,2))
    return newDist
  }

  vectorAngle(layer1X, player1Y, player2X, player2Y){
    let x = player1X - player2X ;
		let y = player1Y  - player2Y ;
		const vecLen = Math.sqrt(Math.pow(x, 2) + Math.pow(y,2))
		x = x / vecLen ;
		y = y / vecLen ;

		let obj =  {xVector : player2X + x, yVector: player2Y + y}
    let theta = Math.atan2(obj.xVector, obj.yVector)

    return theta
  }

  getTheta(){
    return this.theta
  }
  getDistance(){
    return this.distance
  }

}
