var makeDiscoDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.toggle = false;
};

makeDiscoDancer.prototype = Object.create(makeDancer.prototype);
makeDiscoDancer.prototype.constructor = makeDiscoDancer;


makeDiscoDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  makeDancer.prototype.step.call(this);

  this.toggle = !this.toggle;
  
  this.$node.css(this.toggle ? {borderColor: 'blue'} : {borderColor: 'red'});
  
};
