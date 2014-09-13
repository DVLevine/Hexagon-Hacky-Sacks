var Chib = Polygon.extend({
	initialize: function(position, path, speed) {
		this.position = position.clone();
		this.target = path[0];
		this.speed = speed;
		this.vector = new Two.Vector(0,0);
	},
	update: function() {
		var dir = (this.target - this.position).normalize();
		var dX = dir.x * this.speed;
		var dY = dir.y * this.speed;
		this.vector.x = dX;
		this.vector.y = dY;
		this.position += this.vector;
	}
});
