using(import('dom'));
let m = import('math');

let sidebar = document.getElementById('sidebar');

let update = func (selected) {

	if (!selected) {
		sidebar.innerHTML = `
    		Nothing Selected!
    	`;
    	return;
	}

	sidebar.innerHTML = `
		<p>
			#` + selected['Id'].str() + `<br>
			X/Y: ` + m.round(selected['Pos']['X']).str() + `, ` + m.round(selected['Pos']['Y']).str() + `<br>
			` + m.round(selected['Rot'] * 57.2958).str() + `° ` + m.round(selected['Rot']).str() + `r<br>
			` + m.round(selected['Weight'] / 9.81).str() + `Kg<br>
			` + m.round(selected['Energy']).str() + `J<br>
			` + selected['Brain'].str() + `
		</p>
	`;
};