using(import('dom'));
let m = import('math');
let json = import('json');
let time = import('time');

let [ V2 ] = import('vec');
let update_sidebar = import('sidebar').update;

let api_port = 8090;

let canvas = $('#canvas')[0];
let ctx = canvas.getContext('2d');

let var width = 0;
let var height = 0;

let camera = {
    zoom: 1,
    pos: V2(0, 0)
};

let var dragging = false;
let var drag_start: V2 = V2(0, 0);
let var drag_end: V2 = V2(0, 0);

let Agent = interface({
	position: Any
});

let var world = {
	entities: []
};

let var selected: Num = -1;

func agent_by_id (id: Num) {
	for agent in world['entities'] {
		if agent['id'] == id {
			return agent;
		}
	}
};

func drag (event) {
   drag_end = get_mouse_pos_raw(event);
   camera.pos += (drag_end - drag_start) / (-camera.zoom);
   drag_start = drag_end;
   render();
};

func set_canvas_size () {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    width = canvas.width;
    height = canvas.height;
    render();
};

func agent_pos (agent: Obj) {
	return V2(agent['position']['x'], agent['position']['y']);
};

func point_touching_agents (agents: (Arr[Obj]), point: V2): (Arr[Obj]) {
	let var touching: (Arr[Any]) = [];
	for agent in agents {
		if point.dist(agent_pos(agent)) < agent_radius(agent) * camera.zoom {
			touching += [agent];
		}
	}
	return touching;
};

func setup_input_listeners () {
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

		let touching = point_touching_agents(world['entities'], get_mouse_pos(event));
		if touching.len() > 0 {
			selected = touching[0]['id'];
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

func get_mouse_pos_raw (event): V2 {
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

func get_mouse_pos (event): V2 {
	return get_mouse_pos_raw(event) + camera.pos - V2(width/2, height/2);
};

func start_server_connection () {
	let socket = window.WebSocket('ws://' + window.location.hostname + ':' + api_port.str());

	socket.addEventListener('open', func (event) {
		print('Connected to server');
	});

	socket.addEventListener('message', func (event) {
		world = json.parse(event.data);
		render();
	});

	socket.addEventListener('close', func (event) {
		print('Connection closed');
	})
};

func agent_radius (agent) m.sqrt(agent['weight'] / m.PI) + 2;

func render_agent (agent, camera_pos: V2) {
	ctx.beginPath();

	let render_pos: V2 = zoom_scaled_pos(
		V2(
			agent['position']['x'] - camera_pos.x,
			agent['position']['y'] - camera_pos.y
		),
		camera.zoom,
		V2(
			width/2,
			height/2
		)
	);
	let r = agent_radius(agent) * camera.zoom;
	let colour = agent['genes']['colour'];

	ctx.arc(render_pos.x, render_pos.y, r, 0, m.PI * 2);

	ctx.fillStyle = colour;

	ctx.fill();
	ctx.closePath();
};

// 1 / zoom for reverse
func zoom_scaled_pos (pos: V2, zoom: Num, center: V2): V2 {
    return (pos - center) * zoom + center;
};

func render () {
	ctx.clearRect(0, 0, width, height);

	let camera_pos = camera.pos - V2(width, height)/2;

	for agent in world['entities'] {
		render_agent(agent, camera_pos);
	}

	update_sidebar(agent_by_id(selected));
};

func main () {
	set_canvas_size();
	setup_input_listeners();
    start_server_connection();

	// not a very nice solution to memory management lol
    window.setTimeout(window.location.reload, 60 * 1000);
};

main();