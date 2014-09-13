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
		initialize: function(position) {
			this.position = position.clone();
			this.vector = new Point(5,0);
			this.createShapes();
		},
		run: function() {
			this.borders();
			this.update();
			this.move();
		},
		createShapes: function() {
			this.body = new Path.Circle({
				center: [0, 0],
				radius: 10,
				fillColor: 'black',
				strokeColor: 'black'
			});
		},
		move: function() {
			this.body.position = this.position;
		},
		update: function() {
			this.position = new Point(this.position.x + this.vector.x, this.position.y + this.vector.y);
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
	var radius = 10;
	var chibs = [];

	for (var i=0 ; i<chibCount ; i++) {
		var cX = Point.random().x * (view.size.width - 2*radius) + radius;
		var cY = Point.random().y * (view.size.height - 2*radius) + radius;
		var position = new Point(cX, cY);
		chibs.push(new Chib(position));
		console.log('placed chib at: ' + position);
	}
	
	view.onFrame = function(event) {
		for (var i=0 ; i<chibCount ; i++) {
			//var selected = project.activeLayer.children[i];
			//selected.position += dT;
			//console.log(selected.position);
			chibs[i].run();
		}
		view.draw();
	};
};