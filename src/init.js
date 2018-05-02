$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "dat.a-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    
    $('body').append(dancer.$node);
    
    var img = document.createElement('IMG');
    img.src = './funny\ elipse.png';
    img.style.width = '200px';
    img.style.height = '100px';
    dancer.$node.append(img);
    img.style.display = 'none';
    
    window.dancers.push(dancer);
    
    if (window.dancers.length === 1) {
      $('body').on('mouseenter', 'span.dancer', function() {
        this.style.border = '';
        this.className = 'mouseHover';
        var img = this.getElementsByTagName('img')[0];
        img.style.display = 'inline';
        $(img).animate({deg: 360}, {
          duration: 750,
          step: function(now) {
            $(img).css({
              transform: 'rotate(' + now + 'deg)'
            });
          }
        });
        $(img).css({deg: 0});
      });
      $('body').on('mouseleave', 'span.mouseHover', function() {
        this.className = 'dancer';
        this.getElementsByTagName('img')[0].style.display = 'none';
      });
    }
  });
  
  $('.lineUpButton').on('click', function(event) {
    var setTop = Math.floor($('body').height() / 2);
    var setInitialLeft = 10;
    var leftStep = Math.floor(($('body').width() - setInitialLeft * 2) / window.dancers.length);
    window.dancers.forEach((dancer, index)=>{
      dancer.setPosition(setTop, setInitialLeft + index * leftStep);
    });
  });
  
  $('span.title').on('click', function(event) {
    var buttonList = this.parentElement.getElementsByClassName('addDancer')[0];
    if (buttonList.style.display === 'none') {
      buttonList.style.display = 'inline';
    } else {
      buttonList.style.display = 'none';
    }
    event.stopPropagation();
  });
  
  $('.interactiveDanceButton').on('click', function(event) {
    var distanceThreshold = 300;
    var dancerArray = window.dancers.slice();
    
    while (dancerArray.length > 0) {
      var storage = [];
      var distances = dancerArray[0].findDistances(dancerArray);
      var i = 0;
      var topSum = 0;
      var leftSum = 0;
      
      while (distances.length > 0 && i < distances.length) {
        if (distances[i] < distanceThreshold) {
          distances.splice(i, 1);
          storage.push(dancerArray.splice(i, 1)[0]);
          topSum += storage[storage.length - 1].top;
          leftSum += storage[storage.length - 1].left;
        } else {
          i++;
        }
      }
      
      storage.forEach((dancer)=>{
        dancer.setPosition((topSum / storage.length), (leftSum) / storage.length);
        if (storage.length > 1) {
          var size = 10 * storage.length;
          dancer.$node.css({border: size + 'px solid', 'border-radius': size + 'px'});
        }
      });
    }   
  });
  
});

