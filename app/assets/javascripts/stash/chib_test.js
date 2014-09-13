$(function () {

  var two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);

  Two.Resolution = 32;

  var bgGroup = two.makeGroup();
  var chibGroup = two.makeGroup();
  //holds all chib polygons
  var chibs = [];
  var hex = $('#level').data('hex');
  var points = [new Two.Vector(two.width / 4, two.height / 4), new Two.Vector(two.width / 4, 3 * two.height / 4),
  				new Two.Vector(3 * two.width / 4, two.height / 4), new Two.Vector(3 * two.width / 4, 3 * two.height / 4)];
  //Divide screen into 9 chunks. Top left is 0, top right is 2, bottom left is 6, bottom right is 8
  //Chunk number -> index in this array
  //Directions define which way chibs move in each chunk
  var directions = [new Two.Vector(5,0),new Two.Vector(5,0),new Two.Vector(0,5),
  					new Two.Vector(0,-5),new Two.Vector(5,-5),new Two.Vector(0,5),
  					new Two.Vector(0,-5),new Two.Vector(-5,0),new Two.Vector(-5,0)];
  
  //place bg in back layer
  var bg = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
  bg.fill = hex;
  bg.stroke = hex;
  bg.addTo(bgGroup);
  
  var delta = new Two.Vector();
  var mouse = new Two.Vector();
  var drag = 0.33;
  var radius = 25;
  var resetX = new Two.Vector(-(two.width + radius), 0);
  var resetY = new Two.Vector(0, (-(two.height + radius)));
  
  //Spawn all chibs at random location, place in front layer
  var chibCount = $('#level').data('cnumber');
  var chibArray = $('#level').data('carray');
  for(var i=0, l=chibArray.length; i<l; i++) {
  	var posX = Math.floor((Math.random() * (two.width - radius)) + 1);
  	var posY = Math.floor((Math.random() * (two.height - radius)) + 1);
  	var temp = two.makeCircle(posX, posY, radius).noStroke();
  	temp.fill = chibArray[i].color;
  	temp.addTo(chibGroup);
  	console.log(temp.id);
  }
  
  two.update();
  
  _.each(chibGroup.children, function(child) {
  	console.log(child.id);
  	child.domElement = document.getElementById(child.id);
  	child.domElement.onclick = function(e) {
  		alert('click');
  	};
  	console.log('added click function for' + child.id);
  });
  
  console.log("drew dem chibbies");
  
  var keys = Object.keys(chibGroup.children);

  var shadow = two.makeCircle(two.width / 2, two.height / 2, radius);
  shadow.noStroke().fill = 'rgba(255, 255, 255, 0.5)';
  shadow.offset = new Two.Vector(- radius / 2, radius * 2);
  shadow.scale = 0.85;

  console.log("width = " + two.width + ", height = " + two.height);

  var $window = $(window)
    .bind('mousemove', function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    })
    .bind('touchstart', function() {
      e.preventDefault();
      return false;
    })
    .bind('touchmove', function(e) {
      e.preventDefault();
      var touch = e.originalEvent.changedTouches[0];
      mouse.x = touch.pageX;
      mouse.y = touch.pageY;
      return false;
    });
  
  function checkBorders(pos) {
  	var vector = new Two.Vector(0,0);
  	if (pos.x > (two.width + radius)) vector = resetX;
  	else if (pos.y > (two.height + radius)) vector = resetY;
  	return vector;
  }
  
  function getDir(pos) {
  	//Chunk 0
  	if ((pos.x < (two.width / 3)) && (pos.y < (two.height / 3))) return directions[0];
  	//Chunk 1
  	else if (((pos.x >= (two.width / 3)) && (pos.x < (2 * two.width / 3))) && (pos.y < (two.height / 3))) return directions[1];
  	//Chunk 2
  	else if (((pos.x >= (2 * two.width / 3)) && (pos.x < two.width)) && (pos.y < (two.height / 3))) return directions[2];
  	//Chunk 3
  	else if ((pos.x < (two.width / 3)) && ((pos.y >= (two.height / 3)) && (pos.y < (2 * two.height / 3)))) return directions[3];
  	//Chunk 4
  	else if (((pos.x >= (two.width / 3)) && (pos.x < (2 * two.width / 3))) &&
  				((pos.y >= (two.height / 3)) && (pos.y < (2 * two.height / 3)))) return directions[4];
	//Chunk 5
	else if (((pos.x >= (2 * two.width / 3)) && (pos.x < two.width)) &&
  				((pos.y >= (two.height / 3)) && (pos.y < (2 * two.height / 3)))) return directions[5];
  	//Chunk 6
  	else if ((pos.x < (two.width / 3)) && ((pos.y >= (2 * two.height / 3)) && (pos.y < two.height))) return directions[6];
  	//Chunk 7
  	else if (((pos.x >= (two.width / 3)) && (pos.x < (2 * two.width / 3))) &&
  				((pos.y >= (2 * two.height / 3)) && (pos.y < two.height))) return directions[7];
	//Chunk 8
	else if (((pos.x >= (2 * two.width / 3)) && (pos.x < two.width)) &&
  				((pos.y >= (2 * two.height / 3)) && (pos.y < two.height))) return directions[8];
  	else {
  		var dX = (two.width / 2) - pos.x;
  		var dY = (two.height / 2) - pos.y;
  		var vector = new Two.Vector(dX, dY);
  		return vector;
  	}
  }
  
  two.bind('update', function(framecount) {

      delta.copy(mouse).subSelf(shadow.translation);
	  /*for (var i=0, l=chibArray.length; i<l; i++) {
	    var chib = chibGroup.children[keys[i]];
	    var position = chib.translation;
	    var dT = getDir(position);
	    chib.translation.addSelf(dT);
	    var border = checkBorders(position);
	    chib.translation.addSelf(border);
	  }*/

	  /*THIS IS HOW TO MAKE WIBBLYWOBBLY SHAPES---
      _.each(ball.vertices, function(v, i) {

        var dist = v.origin.distanceTo(delta);
        var pct = dist / radius;

        var x = delta.x * pct;
        var y = delta.y * pct;

        var destx = v.origin.x - x;
        var desty = v.origin.y - y;

        v.x += (destx - v.x) * drag;
        v.y += (desty - v.y) * drag;

        shadow.vertices[i].copy(v);

      });
	  ---*/
	 
      shadow.translation.addSelf(delta);

  });

});