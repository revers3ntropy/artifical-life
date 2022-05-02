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

	sidebar.innerHTML = `
		<p>
			#` + selected['id'].str() + `<br>
			X/Y: ` + m.round(selected['position']['x']).str() + `, ` + m.round(selected['position']['x']).str() + `<br>
			` + m.round(selected['rotation'] * 57.2958).str() + `°<br>
			` + m.round(selected['weight'] / 9.81).str() + `Kg<br>
			` + m.round(selected['energy']).str() + `J<br>
		</p>
	`;
};