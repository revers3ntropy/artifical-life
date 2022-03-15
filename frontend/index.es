using(import('dom'));
let m = import('math');
let json = import('json');

let api_port = 8090;

let canvas = $('#canvas')[0];
let ctx = canvas.getContext('2d');

var width;
var height;

let set_canvas_size = func () {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    let canvasW = canvas.width;
    let canvasH = canvas.height;
};

global var world = {
	Agents: []
};

let start_server_connection = func () {
	// Create WebSocket connection.
	let socket = window.WebSocket('ws://' + window.location.hostname + ':' + api_port.str() + '/start-connection');

	// Connection opened
	socket.addEventListener('open', func (event) {
		print('Connected to server');
	});

	// Listen for messages
	socket.addEventListener('message', func (event) {
		world = json.parse(event.data);
		print(world.Agents[0].Pos.X);
		render();
	});
};

let render = func () {
	ctx.clearRect(0, 0, width, height);
	for agent in world.Agents {
		ctx.beginPath();

		ctx.arc(agent.Pos.X, agent.Pos.Y, 10, 0, m.PI * 2);

		ctx.fillStyle = 'red';

		ctx.fill();
		ctx.closePath();
	}
};

let main = func () {
	set_canvas_size();
    start_server_connection();
};

main();
