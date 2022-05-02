using(import('dom'));
let m = import('math');

let sidebar = document.getElementById('sidebar');

func update (selected) {

	if (!selected) {
		sidebar.innerHTML = `
    		Nothing Selected!
    	`;
    	return;
	}

	let var alive = 'dead';
	if selected['alive'] {
		alive = 'alive';
	}

	sidebar.innerHTML = `
		<p>
			` + alive + `<br>
			#` + selected['id'].str() + `<br>
			X/Y: ` + m.round(selected['position']['x']).str() + `, ` + m.round(selected['position']['x']).str() + `<br>
			` + m.round(selected['rotation'] * 57.2958).str() + `°<br>
			` + m.round(selected['mass']).str() + `KG<br>
			` + m.round(selected['energy']).str() + `J<br>
		</p>
	`;
};