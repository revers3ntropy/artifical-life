using(import('dom'));
let m = import('math');
let json = import('json');
let time = import('time');

let api_port = 8090;

let canvas = $('#canvas')[0];
let ctx = canvas.getContext('2d');

let V2 = {
	x: Number,
	y: Number
};

var width = 0;
var height = 0;

let camera = {
    zoom: 1,
    x: 0,
    y: 0
};

var dragging = false;
var drag_start: V2 = {x: 0, y: 0};
var drag_end: V2 = {x: 0, y: 0};

let drag = func (event) {
   drag_end = get_mouse_pos(event);
	let diff = {
		x: (drag_end.x - drag_start.x) / -camera.zoom,
		y: (drag_end.y - drag_start.y) / -camera.zoom
	};

   camera.x += diff.x;
   camera.y += diff.y;
   drag_start = drag_end;
   render();
};

let set_canvas_size = func () {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    width = canvas.width;
    height = canvas.height;
    render();
};

let setup_input_listeners = func () {
	canvas.onwheel = func (evt) {
		evt.preventDefault();
		camera.zoom *= 1 + (evt.deltaY * -0.001);
		camera.zoom = m.min(m.max(5*10^-3, camera.zoom), 5*10^2);
		render();
	};

	canvas.addEventListener('mousedown', func (event) {
        drag_start = get_mouse_pos(event);
        dragging = true;
    });


    canvas.addEventListener('mouseup', func () {
        dragging = false;
    });

	canvas.addEventListener('mousemove', func (evt) {
		if dragging {
			drag(evt);
		}
	});
};

let get_mouse_pos = func (event): V2 {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (event.pageX - rect.left) * canvas.width / rect.width,
        y: (event.pageY - rect.top) * canvas.height / rect.height
    };
};

var world = {
	Agents: []
};

let start_server_connection = func () {
	let socket = window.WebSocket('ws://' + window.location.hostname + ':' + api_port.str() + '/start-connection');

	socket.addEventListener('open', func (event) {
		print('Connected to server');
	});

	socket.addEventListener('message', func (event) {
		world = json.parse(event.data);
		render();
	});
};

let render_agent = func (agent, camera_pos: V2) {
	ctx.beginPath();

	let render_pos: V2 = zoom_scaled_pos(
		{
			x: agent['Pos']['X'] - camera_pos.x,
			y: agent['Pos']['Y'] - camera_pos.y
		},
		camera.zoom,
		{
			x: width/2,
			y: height/2
		}
	);
	let r = 10 * camera.zoom;
	let colour = 'red';

	ctx.arc(render_pos.x, render_pos.y, r, 0, m.PI * 2);

	ctx.fillStyle = colour;

	ctx.fill();
	ctx.closePath();
};

let zoom_scaled_pos = func (pos: V2, zoom: Number, center: V2): V2 {
    return {
    	x: (pos.x - center.x) * zoom + center.x,
    	y: (pos.y - center.y) * zoom + center.y
    };
};

let render = func () {
	ctx.clearRect(0, 0, width, height);
	let camera_pos = {
		x: camera.x - width/2,
		y: camera.y - height/2
	};
	// center marker
	render_agent({
		Pos: {
			X: 0,
			Y: 0
		}
	}, camera_pos);

	for agent in world.Agents {
		render_agent(agent, camera_pos);
	}
};

let main = func () {
	set_canvas_size();
	setup_input_listeners();
    start_server_connection();
};

main();
