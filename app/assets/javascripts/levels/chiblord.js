paper.install(window);
//Label shown on screen when chib is clicked
var mochiLabel;
//chib object that was clicked on
var selectedChib;
//id of selected chib
var selectedID;
//true when a chib has been selected
var singularity = false;

var onLoad = function() {
	//Setting up the canvas
	var myCanvas = document.getElementById('theCanvas');
	myCanvas.style.width = '100%';
	myCanvas.style.height = '100%';
	myCanvas.width = myCanvas.offsetWidth;
	myCanvas.height = myCanvas.offsetHeight;
	paper.setup(myCanvas);
	view.viewSize = new Size(myCanvas.width, myCanvas.height);
	view.draw();
	mochiLabel = document.getElementById('mochi');
	
	//The Chib class
	var Chib = Base.extend({
		initialize: function(position, radius, resolution, id) {
			this.id = id;
			this.name = "chib-" + id;
			this.position = position.clone();
			this.lastLocation;
			this.vector = new Point(2,0);
			this.maxSpeed = Math.random() * 0.1 + 0.15;
			this.orientation = 0;
			this.lastOrientation;
			this.path = new Path();
			this.pathRadius = radius;
			this.pathSides = resolution;
			this.pathPoints = [this.pathSides];
			this.pathPointNormals = [this.pathSides];
			this.pathStyle = {
				fillColor: 'black',
				strokeWidth: 5,
				strokeColor: 'black',
				strokeCap: 'round'
			};
			this.group = new Group();
			this.buildChib();
		},
		run: function(event) {
			this.update(event);
		},
		buildChib: function() {
			for (var i = 0; i<this.pathSides; i++) {
				var theta = (Math.PI * 2) / this.pathSides;
				var angle = theta*i;
				var x = Math.cos(angle) * this.pathRadius * 0.7;
				var y = Math.sin(angle) * this.pathRadius;
				if (angle > 0 && angle < Math.PI) {
					y -= Math.sin(angle) * (this.pathRadius * 0.6);
				}
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
		update: function(event) {
			if (!singularity) {
				this.lastPosition = this.position.clone();
				this.lastOrientation = this.orientation;
				
				this.position.x += this.vector.x;
				this.position.y += this.vector.y;
				this.group.position = this.position.clone();
				$('#'+this.name).css({
					top: this.position.y-this.pathRadius,
					left: this.position.x-this.pathRadius
				});
				var dirVector = new Point(this.position.x - this.lastPosition.x, this.position.y - this.lastPosition.y);
				this.orientation = dirVector.angle;
				this.group.rotate(this.orientation - this.lastOrientation);
				this.borders();
			}
			//pulsate!
			for (var i = 0; i<this.pathSides; i++) {
				var segPoint = this.path.segments[i].point;
				var scaledCounter = -((event.count * this.maxSpeed) + (this.pathPoints[i].y * 0.0375));
				var normalRotated = this.pathPointNormals[i].rotate(this.orientation);
				segPoint.x += normalRotated.x * Math.sin(scaledCounter);
				segPoint.y += normalRotated.y * Math.sin(scaledCounter);
			}
			this.path.smooth();
		},
		borders: function() {
			if (this.position.x > myCanvas.width) {
				this.position = new Point(0, this.position.y);
			}
		}
	});
	//end Chib class
	
	//Ruby vars
	var hex = $('#level').data('hex');
	var chibCount = $('#level').data('cnumber');
	var chibArray = $('#level').data('carray');
	//end Ruby vars
	var radius = 50;
	var chibs = [];
	var path = new Path('M500,500,0 -100.0,100.0 0,0 100.0z');

	function click(event) {
		//check which chib was clicked on
		//freeze chib positions
		if (!singularity) {
			selectedID = event.data.id;
			selectedChib = chibArray[selectedID];
			alert(selectedChib.mochi);
			singularity = true;
			mochiLabel.style.visibility = 'visible';
		}
	};

	//Build the level
	for (var i=0 ; i<chibCount ; i++) {
		var cX = Point.random().x * (view.size.width - 2*radius) + radius;
		var cY = Point.random().y * (view.size.height - 2*radius) + radius;
		var position = new Point(cX, cY);
		chibs.push(new Chib(position, radius, 14, i));
		var id = "chib-"+i;
		$("<div/>").css({
			position: "absolute",
			top: cY-radius,
			left: cX-radius
		}).attr('id', id).width(2*radius).height(2*radius).on('click', {id: i}, function(event) {
			click(event);
		}).insertAfter("#theCanvas");
		console.log('placed chib at: ' + position);
	}
	
	view.onFrame = function(event) {
		for (var i=0 ; i<chibCount ; i++) {
			if (singularity) {
				//loop through points in path, have chibs go to them
			}
			chibs[i].run(event);
		}
		view.draw();
	};
	
};
$(document).ready(onLoad);
$(document).on('click', function(event) {
	if (singularity) {
		if(event.target.id != 'chib-'+selectedID) {
			singularity = false;
			mochiLabel.style.visibility = 'hidden';
		}
	}
});