using(import('dom'));

let canvas = $("#canvas")[0];
let ctx = canvas.getContext('2d');

var width;
var height;

let set_canvas_size = func () {
    canvas.width = document.body.clientWidth; // document.width is obsolete
    canvas.height = document.body.clientHeight; // document.height is obsolete
    let canvasW = canvas.width;
    let canvasH = canvas.height;
};

var world = {};

let fetch = func () {

};

let fetch_data = func () {
	window.fetch('');
};

let render = func () {

};

let main = func () {
	set_canvas_size();


};

main();