paper.install(window);
window.onload = function() {
	//Setting up the canvas
	var myCanvas = document.getElementById('canvas');
	myCanvas.style.width = '100%';
	myCanvas.style.height = '100%';
	myCanvas.width = myCanvas.offsetWidth;
	myCanvas.height = canvas.offsetHeight;
	paper.setup(myCanvas);
	view.viewSize = new Size(myCanvas.width, myCanvas.height);
	view.draw();
	
	var Chib = Base.extend({
		initialize: function(position, radius, resolution) {
			this.position = position.clone();
			this.vector = new Point(2,0);
			this.path = new Path();
			this.pathRadius = radius;
			this.pathSides = resolution;
			this.pathPoints = [this.pathSides];
			this.pathPointNormals = [this.pathSides];
			this.pathStyle = {
				strokeWidth: 5,
				strokeColor: 'black',
				strokeCap: 'round'
			};
			this.group = new Group();
			this.buildChib();
		},
		run: function(event) {
			this.borders();
			this.update(event);
			this.move();
		},
		buildChib: function() {
			for (var i = 0; i<this.pathSides; i++) {
				var theta = (Math.PI * 2) / this.pathSides;
				var angle = theta*i;
				var x = Math.cos(angle) * this.pathRadius;
				var y = Math.sin(angle) * this.pathRadius;
				var point = new Point(x,y);
				this.path.add(point);
				this.pathPoints[i] = point.clone();
				this.pathPointNormals[i] = point.normalize().clone();
			}
			this.path.closed = true;
			this.path.smooth();
			this.path.style = this.pathStyle;
			this.group.addChild(this.path);
		},
		move: function() {
			this.group.position = this.position.clone();
		},
		update: function(event) {
			this.position = new Point(this.position.x + this.vector.x, this.position.y + this.vector.y);
			//pulsate!
			for (var i = 0; i<this.pathSides; i++) {
				var segPoint = this.path.segments[i].point;
				var sinVal = Math.sin(-((event.count * 0.2) + (this.pathPoints[i].y * 0.0375)));
				segPoint.x += this.pathPointNormals[i].x * sinVal;
				segPoint.y += this.pathPointNormals[i].y * sinVal;
			}
			this.path.smooth();
		},
		borders: function() {
			if (this.position.x > myCanvas.width) {
				this.position = new Point(0, this.position.y);
			}
		}
	});
	
	//Ruby vars
	var hex = $('#level').data('hex');
	var chibCount = $('#level').data('cnumber');
	var chibArray = $('#level').data('carray');
	var radius = 30;
	var chibs = [];

	for (var i=0 ; i<chibCount ; i++) {
		var cX = Point.random().x * (view.size.width - 2*radius) + radius;
		var cY = Point.random().y * (view.size.height - 2*radius) + radius;
		var position = new Point(cX, cY);
		chibs.push(new Chib(position, radius, 14));
		console.log('placed chib at: ' + position);
	}
	
	view.onFrame = function(event) {
		for (var i=0 ; i<chibCount ; i++) {
			chibs[i].run(event);
		}
		view.draw();
	};
};