import GhostPage from '../components/GhostPage'


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


const ghosts = newGhosts(players)

const usernmae = ["LaButch", "The Lauren", "Cletus"]

//if a player is assassinated

test("a player is assassinated and their status isAlive is changed to 'false'", () => {
  expect(player.isAlive(false)).toBe(true))
  })

test("a dead player is redirected to the Ghost Page", () => {
  expect(player.GhostRoom(redirect)).toBe(true)
})
