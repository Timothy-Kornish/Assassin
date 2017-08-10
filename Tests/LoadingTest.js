import Loading from '../components/Loading'

const players = {
  id: ' ',
  name: 'LaButcha',
  token: '',
  latitude: 46.0783231,
  longitude: -113.203125,
  isAlive: 'true',
  hireable: 'true',
  target: 'The Lauren',
  timeOnline: 60,
},

{id: ' ',
 name: 'The Lauren',
 token: ' ',
 latitude: 46.0783232,
 longitude: -113.203126,
 isAlive: 'true',
 hireable: 'true',
 target: 'Cletus',
 timeOnline: 45,
},

{id: ' ',
 name: 'Cletus',
 latitude: 46.0783233,
 longitude: -113.203128,
 isAlive: 'true',
 hireable: 'true',
 target: 'LaButcha',
 timeOnline: 62,
}

const loading = new Loading(players)

const usernames = ["LaButch", "The Lauren", "Cletus"]


//if start game button is pressed...

test("players press button and sent to the game page and the countdown begins", () => {
  expect(game.startCountdown(players).toBe(true))
})
//when targets are assigned...

test("players are assigned a target", () => {
  expect(players.targetAssigned(players)).toBe('true')
})
//loading page....all players are present and ready
