#  Real time network multiplayer game using JavaScript and React


## Client

Client refers to a player. Client has three main components which is Game, Join and Move. Game component is used
for starting a game i.e by on the basis of room. Join component is used for joining the particular room and start the
game between two players. Move component is responsible to display the position and their movements of the players
and fruits on the canvas. This has the capability to handle multiple games at same point of time and each game is a two
player game. Player need to enter his name and room in order to join the game. Only two players with different name
and same room is allowed to play the game.

### Client Working url

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Server

The server consists of a file index.js in which HTTP server is created. When a join request is sent by client with valid
url the server accepts the request. Users.js is invoked to get the required information for a client request. If number of
users in the room is 2 then the game will be established by creating 9 random fruits on the canvas. when a client is
moved from his position the coordinates of the client was fetched and updated to remaining clients. Similarly when
anyone of the client ate a fruit, the server will update to all the connected clients which in turn reflects in canvas. The
server also handles socket connection and disconnection and also acts on valid requests made by client

### Server Working url

Runs the app in the development mode.

Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The server will responds to client requests. 


##	TOOLS AND TECHNOLOGIES USED


The team chose to develop the application in JavaScript since it has an ability to support various web browsers and
produces equivalent results over all of them. It also provides an edge over other languages to make rich user interface.

Visual Studio: Visual Studio is an Integrated Development Environment developed by microsoft.
The application was developed in this IDE. This IDE comes with very powerful functionalities out of the box. It’s
extensions and add ons make it even easier to develop applications in Visual Studio.

• Node.js: Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on a
JavaScript Engine and executes JavaScript code outside a web browser. It was designed to build scalable network
applications. It can generate dynamic page content and also handles file operations on the server. It can modify
data in your database.

• React: React is a free and open-source front-end JavaScript library for building user interfaces based on UI
components. In this large chunks of HTML codes can be divided into components and we can utilize these
components and integrate them wherever needed. The component-based approach, automatic rendering, and
use of just plain JavaScript makes it easier to learn and develop web based applications.

• JSDoc: It is a very powerful document generator used by developers of JavaScript. It works automatically by
reading comments in our local files to make inferences. In the end an HTML file is generated with all the
required documentation.
