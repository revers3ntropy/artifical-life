using(import('dom'));
let m = import('math');

let sidebar = document.getElementById('sidebar');

let brain_html = func (brain: Any): String `
	<div>

	</div>
`;

let update = func (selected) {

	if (!selected) {
		sidebar.innerHTML = `
    		Nothing Selected!
    	`;
    	return;
	}

	print(selected);

	sidebar.innerHTML = `
		<p>
			#` + selected['Id'].str() + `<br>
			X/Y: ` + m.round(selected['Pos']['X']).str() + `, ` + m.round(selected['Pos']['Y']).str() + `<br>
			` + m.round(selected['Rot'] * 57.2958).str() + `° ` + m.round(selected['Rot']).str() + `r<br>
			` + m.round(selected['Weight'] / 9.81).str() + `Kg<br>
			` + m.round(selected['Energy']).str() + `J<br>
			` + brain_html(selected['Brain']) + `
		</p>
	`;
};