var makeDancer = function(top, left, timeBetweenSteps) {
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<span class="dancer"></span>');
  
  this.step();
  this.setPosition(top, left);
};

makeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout(function() {
    this.step();
  }.bind(this), this.timeBetweenSteps);
};

makeDancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
  this.top = top;
  this.left = left;
};

makeDancer.prototype.calculateDistance = function(dancer) {
  return Math.pow(Math.pow(this.top - dancer.top, 2) + Math.pow(this.left - dancer.left, 2), 0.5);
};

makeDancer.prototype.findDistances = function(dancerArray) {
  var distances = [];
  
  dancerArray.forEach(function(dancer) {
    distances.push(this.calculateDistance(dancer));
  }.bind(this)); 
  
  return distances; 
};
