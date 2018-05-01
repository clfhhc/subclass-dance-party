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
    // img.style['justify-content'] = 'center';
    // img.style['align-items'] = 'center';
    
    window.dancers.push(dancer);
    
    if (window.dancers.length === 1) {
      $('body').on('mouseenter', 'span.dancer', function() {
        this.className = 'mouseHover';
        this.getElementsByTagName('img')[0].style.display = 'inline';
        
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
  
  
  
  // old interact button
  // $('.interactiveDanceButton').on('click', function(event) {
  //   var n = Math.floor(window.dancers.length * Math.random());
  //   window.dancers.forEach(function(dancer) {
  //     var ratio = dancer.findDistanceRatio(window.dancers, n);
  //     dancer.$node.removeClass('dancer').addClass('interactiveDancer');
  //     dancer.$node.css({
  //       'border-color': 'green', 
  //       'border-width': Math.floor(ratio * 200) + 'px', 
  //       'border-style': 'solid',
  //       'border-radius': Math.floor(ratio * 200) + 'px'
  //     });
  //     var animation = (function(cb) {
  //       dancer.$node.animate({'top': (dancer.top + 20) + 'px'});
  //       dancer.$node.animate({'top': (dancer.top - 20) + 'px'});
  //       setTimeout(cb.bind(dancer, cb), 1000);
  //     });
  //     animation(animation);
  //   });
  // });

});

