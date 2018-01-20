 class ServerFunk{
  constructor(list, username){
    this.list = list
    this.username = username

    this.listVal = this._organize(this.list)
    this.listArr = this.listVal.arr
    this.listObj = this.listVal.obj

    if(this.listObj[username].target){
      this.target = this.listObj[username].target
      if(this.listObj[this.target])  {
        this.targetsTarget = this.listObj[this.target].target
        console.log("target ", this.target, "tt", this.targetsTarget)
        this.user1X = parseFloat(this.listObj[username].longitude)
        this.user1Y = parseFloat(this.listObj[username].latitude)
        this.user2X = parseFloat(this.listObj[this.target].longitude)
        this.user2Y = parseFloat(this.listObj[this.target].latitude)
        console.log("users ", this.user1X, this.user1Y, this.user2X, this.user2Y)
        this.distance = this.dist(this.user1X, this.user1Y, this.user2X, this.user2Y)
        this.theta = this.vectorAngle(this.user1X, this.user1Y, this.user2X, this.user2Y)
        console.log("theta",this.theta)
      }
    }
  }

  _organize(arr){
    let obj = {}
    for(var i = 0; i < arr.length; i++){
      let username = arr[i].username
      obj[username] = arr[i]
  		arr[i]  = username
  	}
    return {arr, obj}
  }

  dist(x1,y1,x2,y2){
    let latitudeToFeet = 364724.56917613005 // in Missoula
    let longitudeToFeet = 250131.5464035199 // in Missoula
    y1 *= latitudeToFeet
    y2 *= latitudeToFeet
    x1 *= longitudeToFeet
    x2 *= longitudeToFeet
    let newDist = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2,2))
    return newDist
  }

  vectorAngle(player1X, player1Y, player2X, player2Y){

		const vecLen = this.dist(player1X, player1Y, player2X, player2Y)
		let x = (player1X - player2X) / vecLen ;
		let y = (player1Y- player2Y) / vecLen ;

		let obj =  {xVector : (player2X + x), yVector: (player2Y + y)}
    let num = y/x
    let theta = Math.atan(num) *180/Math.PI

    return ((360 + theta) % 360) 
  }

  getTheta(){
      return this.theta
  }
  getDistance(){
      return this.distance
  }
  getTarget(){
      return this.target
  }
  getTargetsTarget(){
      return this.targetsTarget
  }
  getListObj(){
      return this.listObj
  }
  getListArr(){
      return this.listArr
  }
}
module.exports = ServerFunk
