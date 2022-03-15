using(import('dom'));

let canvas = $("#canvas")[0];
let ctx = canvas.getContext('2d');

var width;
var height;

let set_canvas_size = func () {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    let canvasW = canvas.width;
    let canvasH = canvas.height;
};

var world = {};

let host = window.location.protocol + '//' + window.location.hostname;

let fetch_data = func () {
    print('fetching data');
	window.fetch(host + ':8090/get', {
	    method: 'POST',
	    body: "{}"
	})
        .then(func (data) {
            print(data);
        });
};

let render = func () {

};

let main = func () {
	set_canvas_size();
    fetch_data();
};

main();
