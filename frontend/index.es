using(import('dom'));
let m = import('math');
let json = import('json');
let time = import('time');

let V2 = import('vec').V2;
let update_sidebar = import('sidebar').update;

let api_port = 8090;

let canvas = $('#canvas')[0];
let ctx = canvas.getContext('2d');

var width = 0;
var height = 0;

let camera = {
    zoom: 1,
    pos: V2(0, 0)
};

var dragging = false;
var drag_start: V2 = V2(0, 0);
var drag_end: V2 = V2(0, 0);

let Agent = {

};

var world = {
	Agents: []
};

var selected: Number = -1;

let agent_by_id = func (id: Number) {
	for agent in world['Agents'] {
		if agent['Id'] == id {
			return agent;
		}
	}
};

let drag = func (event) {
   drag_end = get_mouse_pos_raw(event);
   camera.pos += (drag_end - drag_start) / (-camera.zoom);
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

let agent_pos = func (agent: Object) {
	return V2(agent['Pos']['X'], agent['Pos']['Y']);
};

let point_touching_agents = func (agents: (Array[Object]), point: V2): (Array[Object]) {
	var touching: (Array[Any]) = [];
	for agent in agents {
		if point.dist(agent_pos(agent)) < agent_radius(agent) * camera.zoom {
			touching += [agent];
		}
	}
	return touching;
};

let setup_input_listeners = func () {
	canvas.onwheel = func (evt) {
		evt.preventDefault();
		camera.zoom *= 1 + (evt.deltaY * -0.001);
		camera.zoom = m.min(m.max(5*10^-3, camera.zoom), 5*10^2);
		render();
	};

	canvas.addEventListener('mousedown', func (event) {
        drag_start = get_mouse_pos_raw(event);
        dragging = true;
    });


    canvas.addEventListener('mouseup', func (event) {
        dragging = false;

		let touching = point_touching_agents(world['Agents'], get_mouse_pos(event));
		if touching.len() > 0 {
			selected = touching[0]['Id'];
		} else if (get_mouse_pos(event).dist(drag_start) < 5) {
			selected = -1;
		}
    });

	canvas.addEventListener('mousemove', func (evt) {
		if dragging {
			drag(evt);
		}
	});
};

let get_mouse_pos_raw = func (event): V2 {
    let rect = canvas.getBoundingClientRect();

	return zoom_scaled_pos(
		V2(
			(event.pageX - rect.left) * canvas.width / rect.width,
			(event.pageY - rect.top) * canvas.height / rect.height
		),
		1/camera.zoom,
		V2(
			width/2,
			height/2
		)
	);
};

let get_mouse_pos = func (event): V2 {
	return get_mouse_pos_raw(event) + camera.pos - V2(width/2, height/2);
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

let agent_radius = func (agent) m.sqrt(agent.Weight / m.PI);

let render_agent = func (agent, camera_pos: V2) {
	ctx.beginPath();

	let render_pos: V2 = zoom_scaled_pos(
		V2(
			agent['Pos']['X'] - camera_pos.x,
			agent['Pos']['Y'] - camera_pos.y
		),
		camera.zoom,
		V2(
			width/2,
			height/2
		)
	);
	let r = agent_radius(agent) * camera.zoom;
	let colour = agent.Genes.Colour;

	ctx.arc(render_pos.x, render_pos.y, r, 0, m.PI * 2);

	ctx.fillStyle = colour;

	ctx.fill();
	ctx.closePath();
};

// 1 / zoom for reverse
let zoom_scaled_pos = func (pos: V2, zoom: Number, center: V2): V2 {
    return (pos - center) * zoom + center;
};

let render = func () {
	ctx.clearRect(0, 0, width, height);

	let camera_pos = V2(
		camera.pos.x - width/2,
		camera.pos.y - height/2
	);

	for agent in world.Agents {
		render_agent(agent, camera_pos);
	}

	update_sidebar(agent_by_id(selected));
};

let main = func () {
	set_canvas_size();
	setup_input_listeners();
    start_server_connection();

    window.setTimeout(func () {
    	window.location.reload();
    }, 60 * 1000);
};

main();
