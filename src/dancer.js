var makeDancer = function(top, left, timeBetweenSteps) {
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<span class="dancer"></span>');
  
  makeDancer.prototype.step.call(this);
  
  makeDancer.prototype.setPosition.call(this, top, left);
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
  this.top=top;
  this.left=left;
};

makeDancer.prototype.calculateDistance = function(dancer){
  return ((this.top-dancer.top) ** 2+(this.left-dancer.left) ** 2) ** 0.5;
}

makeDancer.prototype.findDistanceRatio = function(dancerArray,n){
  var distances=[];
  
  dancerArray.forEach(function(dancer,index){
    distances.push(this.calculateDistance(dancer));
  }.bind(this));
  
  var sorted = distances.sort(function(a,b) {
    return a - b;
  });
  var closestSum;
  var distanceSum = sorted.reduce((accu,item,index)=> {
    accu+=item;
    (index===n-1) && (closestSum=accu);
    return accu;
  });
  
  return closestSum/distanceSum*1/n;
}


//Original:
// // Creates and returns a new dancer object that can step
// var makeDancer = function(top, left, timeBetweenSteps) {

//   var dancer = {};

//   // use jQuery to create an HTML <span> tag
//   dancer.$node = $('<span class="dancer"></span>');

//   dancer.step = function() {
//     // the basic dancer doesn't do anything interesting at all on each step,
//     // it just schedules the next step
//     setTimeout(dancer.step, timeBetweenSteps);
//   };
//   dancer.step();

//   dancer.setPosition = function(top, left) {
//     // Use css top and left properties to position our <span> tag
//     // where it belongs on the page. See http://api.jquery.com/css/
//     //
//     var styleSettings = {
//       top: top,
//       left: left
//     };
//     dancer.$node.css(styleSettings);
//   };

//   // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
//   // this one sets the position to some random default point within the body
//   dancer.setPosition(top, left);

//   return dancer;
// };