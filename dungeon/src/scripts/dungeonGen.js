const dungeonGen = () => {
  const rooms = [];
  rooms.push(createStartingRoom(98, 98));
  rooms.push(getNextRoom(rooms[0], getDirection(rooms[0].dir)));

  for (let i = 0; i < 10; i++) {
    const room = getNextRoom(rooms[rooms.length-1], getDirection(rooms[rooms.length-1].dir));
    let isValid = true;
    for (let j = 0; j < rooms.length - 1; j++) {
      isValid = !roomsOverlap(room, rooms[j]);
    }
    if (isValid) rooms.push(room);
  }

  return createMapData(rooms);
}

/* Creates a room object around the origin */
const createStartingRoom = (originX, originY) => {
  const room = {};
  room.width = Math.floor(Math.random() * 5) + 4;
  room.height = Math.floor(Math.random() * 5) + 4;
  room.x = originX;
  room.y = originY;
  room.x2 = originX + room.width;
  room.y2 = originY + room.height;
  room.dir = getRandomDirection();
  return room;
}

/* Creates a room object in the direction indicated by the parameter and accounting for the previous room */
const getNextRoom = (room, dir) => {
  const nextRoom = {};
  switch (dir) {
    default:
    case 'N':
      nextRoom.x = (room.x + Math.round(room.width / 2)) - getRandomInt(2, 4);
      nextRoom.x2 = (room.x + Math.round(room.width / 2)) + getRandomInt(2, 4);
      nextRoom.width = nextRoom.x2 - nextRoom.x;
      nextRoom.y = room.y - getRandomInt(4, 8);
      nextRoom.y2 = room.y;
      nextRoom.height = nextRoom.y2 - nextRoom.y;
      nextRoom.dir = 'N';
      break;
    case 'E':
      nextRoom.x = room.x2;
      nextRoom.x2 = room.x2 + getRandomInt(4, 8);
      nextRoom.width = nextRoom.x2 - nextRoom.x;
      nextRoom.y = (room.y + Math.round(room.height / 2)) - getRandomInt(2, 4);
      nextRoom.y2 = (room.y + Math.round(room.height / 2)) + getRandomInt(2, 4);
      nextRoom.height = nextRoom.y2 - nextRoom.y;
      nextRoom.dir = 'E';
      break;
    case 'S':
      nextRoom.x = (room.x + Math.round(room.width / 2)) - getRandomInt(2, 4);
      nextRoom.x2 = (room.x + Math.round(room.width / 2)) + getRandomInt(2, 4);
      nextRoom.width = nextRoom.x2 - nextRoom.x;
      nextRoom.y = room.y2;
      nextRoom.y2 = room.y2 + getRandomInt(4, 8);
      nextRoom.height = nextRoom.y2 - nextRoom.y;
      nextRoom.dir = 'S';
      break;
    case 'W':
      nextRoom.x = room.x - getRandomInt(4, 8);
      nextRoom.x2 = room.x;
      nextRoom.width = nextRoom.x2 - nextRoom.x;
      nextRoom.y = (room.y + Math.round(room.height / 2)) - getRandomInt(2, 4);
      nextRoom.y2 = (room.y + Math.round(room.height / 2)) + getRandomInt(2, 4);
      nextRoom.height = nextRoom.y2 - nextRoom.y;
      nextRoom.dir = 'W';
      break;
  }
  return nextRoom;
}

/* Transforms room object array into 2d array of numbers indicating room type */
const createMapData = (rooms) => {
  let maxX = 0, minX = 200, maxY = 0, minY = 200;
  rooms.forEach(room => {
    if (room.x + room.width > maxX) maxX = room.x + room.width + 1;
    if (room.x < minX) minX = room.x;
    if (room.y + room.height > maxY) maxY = room.y + room.height + 1;
    if (room.y < minY) minY = room.y;
  });

  const gameMap = Array(maxX - minX + 1).fill(0).map(x => Array(maxY - minY + 1).fill(0));
  
  rooms.forEach(room => {
    for (let i = room.x - minX; i <= room.x2 - minX; i++ )
    for (let j = room.y - minY; j <= room.y2 - minY; j++)
    {
      const x = room.x - minX, 
            y = room.y - minY, 
            wallX = room.x2 - minX,
            wallY = room.y2 - minY;
      if (i === x || i === wallX || j === y || j === wallY)
        gameMap[i][j] = 1;
      else
        gameMap[i][j] = 21;
      
    }
  });
  return gameMap;
}


/* Utility Functions */

const roomsOverlap = (room1, room2) => {
  return (room1.x <= room2.x2 &&
          room2.x <= room1.x2 &&
          room1.y <= room2.y2 &&
          room2.y <= room1.y2)
}

const getDirection = (dir) => {
  const r = Math.random();
  const possibleDirs = ['N', 'E', 'S', 'W'];
  const dirs = possibleDirs.filter(x => x !== dir);
  if (r < 0.33) {
    return dirs[0];
  } else if (r < 0.66) {
    return dirs[1];
  } else {
    return dirs[2];
  }
}

const getRandomDirection = () => {
  const r = Math.random();
  if (r < 0.25) {
    return 'N';
  } else if (r < 0.5) {
    return 'E';
  } else if (r < 0.75) {
    return 'S';
  } else {
    return 'W';
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default dungeonGen;