DROP TABLE IF EXISTS playersToGames;
DROP TABLE IF EXISTS games, players;

CREATE TABLE games (
  roomCode VARCHAR(4) NOT NULL UNIQUE,
  active TINYINT(1) DEFAULT 0 NOT NULL,
  PRIMARY KEY (roomCode)
);

CREATE TABLE players(
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) DEFAULT '' NOT NULL,
  latitude VARCHAR(255) DEFAULT '' NOT NULL,
  alive VARCHAR(5) DEFAULT 'false',
  target VARCHAR(100) DEFAULT '',
  targetStatus VARCHAR(5) DEFAULT 'false',
  hireable VARCHAR(5) DEFAULT 'false',
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (username)
);

CREATE TABLE playersToGames (
  roomCode VARCHAR(4) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  admin VARCHAR(5) DEFAULT 'false' NOT NULL,
  FOREIGN KEY (roomCode)
    REFERENCES games(roomCode),
  FOREIGN KEY (username)
    REFERENCES players(username)
);
