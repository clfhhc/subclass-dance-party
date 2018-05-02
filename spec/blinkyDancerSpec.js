describe('blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new makeBlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node blink', function() {
    sinon.spy(blinkyDancer.$node, 'toggle');
    blinkyDancer.step();
    expect(blinkyDancer.$node.toggle.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(blinkyDancer, 'step');
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      //clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
    
    it('should calculate the correct distances between dancers', function() {
      var blinkyDancer1 = new makeBlinkyDancer(1, 1, timeBetweenSteps);
      var blinkyDancer2 = new makeBlinkyDancer(5, -2, timeBetweenSteps);
      
      expect(blinkyDancer1.calculateDistance(blinkyDancer2)).to.be.equal(5);
    });
    
    it('should find distances between current dancer and each dancer in an array', function() {
      var dancers = [];
      dancers.push(new makeBlinkyDancer(1, 1, timeBetweenSteps));
      dancers.push(new makeBlinkyDancer(5, -2, timeBetweenSteps));
      dancers.push(new makeBlinkyDancer(5, 1, timeBetweenSteps));
      dancers.push(new makeBlinkyDancer(5, 4, timeBetweenSteps));
      
      expect(dancers[0].findDistances(dancers)).to.be.eql([0, 5, 4, 5]);
    });
  });
  
  
});