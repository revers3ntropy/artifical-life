let m = import('math');

class V2 {
	x: Num;
	y: Num;

	init (x: Num, y: Num) {
		this.x = x;
		this.y = y;
	}

	__add__ (o: Any) {
		if o.isa(V2) {
			return V2(this.x + o.x, this.y + o.y);
		} else {
			return V2(this.x + o, this.y + o);
		}
	}

	__subtract__ (o: Any) {
		if o.isa(V2) {
			return V2(this.x - o.x, this.y - o.y);
		} else {
			return V2(this.x - o, this.y - o);
		}
	}

	__divide__ (o: Any) {
		if o.isa(V2) {
			return V2(this.x / o.x, this.y / o.y);
		} else {
			return V2(this.x / o, this.y / o);
		}
	}

	__multiply__ (o: Any) {
		if o.isa(V2) {
			return V2(this.x * o.x, this.y * o.y);
		} else {
			return V2(this.x * o, this.y * o);
		}
	}

	__eq__ (o: Any) {
		return o.isa(V2) && o.x == this.x && o.y == this.y;
	}

	dist (o: Any): Num {
		if o.isa(V2) {
			return m.sqrt(((this.x - o.x) ^ 2) + ((this.y - o.y) ^ 2));
		}
	}

	mod ():	Num {
		return m.sqrt(this.x ^ 2 + this.y ^ 2);
	}
};