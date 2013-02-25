jQuery(document).ready(function() {
  var blocksAmount = 200;
  var blockSize    = $('.squares li.template').outerWidth(true);

  var viewportWith   = $(window).width();
  var viewportHeight = $(window).height();

  var blocksFitX = Math.floor((viewportWith / blockSize) * 100) / 100;
      blocksFitX = blocksFitX.toFixed(2);
      blocksFitX = blocksFitX.split('.')[1];

  if(blocksFitX != 0) {
    for (blocksFitX; blocksFitX != 0; blocksFitX) {
      blockSize  = blockSize + 1;

      blocksFitX = Math.floor((viewportWith / blockSize) * 100) / 100;
      blocksFitX = blocksFitX.toFixed(2);
      blocksFitX = blocksFitX.split('.')[1];
    };
  }

  var blockMarginLeft  = parseInt($('.squares li.template').css('margin-left').replace("px", ""));
  var blockMarginRight = parseInt($('.squares li.template').css('margin-right').replace("px", ""));
  var blockNewSize     = blockSize - (blockMarginLeft + blockMarginRight);

  var blocksX = Math.floor(viewportWith / blockSize);
  var blocksY = Math.floor(viewportHeight / blockSize);

  var docMarginY = (viewportHeight - (blockSize * blocksY)) / 2;

  blocksAmount = blocksX * blocksY;

  $('body').css('padding-top', docMarginY);
  $('.squares li').css('width', blockNewSize);
  $('.squares li').css('height', blockNewSize);

  for (var i = 1; i < blocksAmount; i++) {
    var block = $('.squares li.template').clone();
    block.removeClass('template');
    $('.squares').append(block);
  };

  var $blocks = $('.squares li');

  var fu = [[2, 2], 
            [3, 2], 
            [4, 2],
            [5, 2],
            [6, 2],
            [2, 3],
            [2, 4],
            [4, 3],
            [4, 4],
            [2, 6],
            [3, 6],
            [4, 6],
            [5, 6],
            [6, 6],
            [6, 7],
            [6, 8],
            [5, 8],
            [4, 8],
            [3, 8],
            [2, 8]
          ];

  var gg = [
    [2, 5],
    [2, 4],
    [2, 3],
    [2, 2],

    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],

    [6, 3],
    [6, 4],
    [6, 5],

    [5, 5],
    [4, 5],

    [4, 4],


    [2, 10],
    [2, 9],
    [2, 8],
    [2, 7],

    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],

    [6, 8],
    [6, 9],
    [6, 10],

    [5, 10],
    [4, 10],

    [4, 9],    
  ];

  // snake();

  // function snake() {
  //   i = 0;
  //   y = 0;
  //   a = 0;
  //   var kak = blocksX - 1;
  //   var muliply = true;
  //   var kek = setInterval(function(){


  //     if (i == kak) {
  //       y++;
  //       kak     = blocksX * y;
  //       kak    += blocksX;
  //       i       = kak;
  //       muliply = false;
  //     }

  //     if($blocks[i]) clearInterval('kek');

  //     if(a == 1) i++;

  //     if(muliply && a > 1){
  //       i++;
  //     } else {
  //       i--;
  //     }
  //     a++;

  //     flip($blocks, i);

  //     console.log(i);
  //   }, 200);
  // }

  // var i = 0;
  // var test = setInterval(function(){
  //   flip(blocksX);
  // }, 100);

  // function flip() {
  //   var blockPos = (blocksX * (gg[i][0] - 1)) + (gg[i][1] - 1);
  //   $($blocks[blockPos]).addClass('flip');
  //   i++;

  // function flip(blocks, i) {
  //   if($(blocks[i]).hasClass('flip')) {
  //     $(blocks[i]).removeClass('flip');
  //   } else {
  //     $(blocks[i]).addClass('flip');
  //   }
  // }

  //   if(!gg[i]) clearInterval(test);
  // }

  var turnTimeMin = 100;
  var turnTimeMax = 200;

  setInterval(function(){
    var randomTurnTime = Math.floor(turnTimeMin + (Math.random()*((turnTimeMax - turnTimeMin)) + 1))
    var randomBlock = Math.floor(Math.random()*(blocksAmount+1));
      $($blocks[randomBlock]).addClass('flip');
      setTimeout(function(){
        $($blocks[randomBlock]).removeClass('flip');
      }, randomTurnTime);
  }, 100);

  // dit zou ook in CSS kunnen maak dan werkt het niet op touch devices
  $('.squares li').bind({
    click: function(){
      $(this).addClass('flip');
    }
  });

});
 