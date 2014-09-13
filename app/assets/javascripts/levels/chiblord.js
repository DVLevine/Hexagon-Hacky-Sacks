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
			
		}
	});
	
	//Ruby vars
	var hex = $('#level').data('hex');
	var chibCount = $('#level').data('cnumber');
	var chibArray = $('#level').data('carray');
	
	var radius = 10;
	var dT = new Point({
		angle: 90,
		length: 5
	});
	var chib = new Path.Circle({
		center: [0, 0],
		radius: 10,
		fillColor: 'black',
		strokeColor: 'black'
	});
	
	var chibSymbol = new Symbol(chib);
	
	for (var i=0 ; i<chibCount ; i++) {
		var cX = Point.random().x * (view.size.width - 2*radius) + radius;
		var cY = Point.random().y * (view.size.height - 2*radius) + radius;
		var center = new Point(cX, cY);
		var placedChib = chibSymbol.place(center);
		console.log('placed chib at: ' + center);
	}
	
	view.onFrame = function(event) {
		for (var i=0 ; i<chibCount ; i++) {
			var selected = project.activeLayer.children[i];
			selected.position += dT;
			console.log(selected.position);
		}
	};
};