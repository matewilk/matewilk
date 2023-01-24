---
title: "Websocket based game"
date: "2018-08-05"
category: ["JavaScript", "WebSocket", "React", "Redux", "Node.js", "Express"]
cover: "/images/blog/wheel-cover.jpeg"
thumb: "/images/blog/sm/wheel-thumb.png"
---

## Spin The Wheel

[GitHub Repo](https://github.com/matewilk/spin-the-wheel) - for the full source code

Spin the wheel is a web application that allows users to play a simple game. The game is based on a wheel with multiple editable sectors. Each sector has a different color and a different value. The user can spin the wheel and win a prize. The prize is determined by the sector the wheel stops on. The game is using websockets to communicate with the server. The server is responsible for managing the game state and sending the game updates to the clients.

### Main Features

- multiple players
  - theoretically infinite number of players (limited by the server performance)
- real time websockets communication
- editable wheel sectors
- shaerable game link
  - auto generated game id
  - user can set the game id with url parameter
- simple game rules
- animated wheel
- animated user iteractions
- responsive design
- blocking UI during the game
- state reflected for all players in real time
- state is preserved after page reload
- google analytics integration

### Architecture overview

The main part of the application is the `Wheel` component responsible for rendering the wheel and animations. It also handles the wheel events like spinning and stopping. The component is using `d3.js` library to render the wheel and `react-tap-event-plugin` library to handle the mobile touch events. Spinning the wheel is done by setting the `transform` property of the wheel element. The `transform` property is animated using `requestAnimationFrame` function. The animation is stopped when the wheel stops spinning. Random number is generated to determine the theta delta - the angular velocity of the wheel. Final value - sector and rotation angle - is determined by the theta delta and the number of sectors. When the wheel is spinning all game users actions are being blocked.

### Code sample

Calculating the final value - sector value and wheel rotation angle

```javascript
calculateSelectedValue (theta) {
  let sectorsCount = this.props.sectors.length;
  // +0.5 because value selector is at the bottom of the wheel
  let rotations = (theta / 360) + 0.5;
  let angle = (rotations % 1) * 360;
  let displacement = (angle / (360 / sectorsCount));
  let sector = sectorsCount - 1 - Math.floor(displacement);

  let value = this.props.sectors[sector].name;
  this.setState({value: value, rotAngle: angle});
}
```

### Tech stack and libraries

- [React](https://reactjs.org/) - for the user interface
- [React-Router](https://reactrouter.com/en/main) - for routing
- [Redux](https://redux.js.org/) - for managing application state (font-end and back-end)
- [Express](https://expressjs.com/) - for the server
- [Material-UI](https://material-ui.com/) - for the UI components
- [d3](https://d3js.org/) - for rendering the wheel and animations
- [Socket.io](https://socket.io/) - for websockets communication
- [react-tap-event-plugin](https://www.npmjs.com/package/react-tap-event-plugin) - for handling mobile touch events
- [webpack](https://webpack.js.org/) - for bundling the application
- [babel](https://babeljs.io/) - for transpiling the code
- [Google Analytics](https://analytics.google.com/analytics/web/) - for tracking the user interactions
