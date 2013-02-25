$(function(){

  // IDEEEN
  // - blocken laten reageren op muziek
  // - spinning block

  var Square = Backbone.Model.extend({
    defaults: {
      size: 120, // pixels
      turnTimeMin: 100, // milliseconden
      turnTimeMax: 1000, // milliseconden
      randomInterval: 150, // milliseconden
      loadTime: 2400 // milliseconden
    }
  });

  var Squares = Backbone.View.extend({
    el: $(".squares"),
    square: new Square(),
    template: _.template($('#square').html()),

    events: {
      "click li" : "flip"
    },

    initialize: function(){
      var self = this;

      this.viewportWidth  = $(window).width();
      this.viewportHeight = $(window).height();
      this.squareSize     = this.square.get('size');
      this.turnTimeMin    = this.square.get('turnTimeMin');
      this.turnTimeMax    = this.square.get('turnTimeMax');
      this.squaresFit     = this.fit();

      self.render();
    },

    render: function(){
      this.loader();
      this.resizeContainer();
      this.fill();
      this.start();
      this.effectRandomColor();
    },

    loader: function(){
      $('body').append('<div id="loading"><div class="block"></div></div>');
      
      var $loading = $("#loading");

      var middleTop   = this.viewportHeight / 2;
      var middleLeft  = this.viewportWidth  / 2;
      var middleBlock = this.squareSize / 2;

      var left = middleLeft - middleBlock;
      var top  = middleTop  - middleBlock;

      $loading.css('top',  top);
      $loading.css('left', left);

      $loading.fadeIn(1000);

      setTimeout(function(){
        $loading.addClass('flip');
      }, 100);
      setTimeout(function(){
        $loading.fadeOut(1000);
      }, 2000);
    },

    setSize: function(){
      this.$el.children().css('width', this.squareSize);
      this.$el.children().css('height', this.squareSize);
    },

    fit: function(){
      this.squareFitX = Math.floor(this.viewportWidth / this.squareSize);
      this.squareFitY = Math.floor(this.viewportHeight / this.squareSize);
      return (this.squareFitX + 2) * (this.squareFitY + 2); // +2 zorgt ervoor er squares van het het scherm kunnen aflopen
    },

    fill: function(){
      for (var i = 0; i < this.squaresFit; i++) {
        this.$el.append(this.template());
      }
      this.setSize();
    },

    start: function(){
      var self = this;
      
      $('body').append('<div id="fade-in"></div>');
      
      var $fadeIn = $("#fade-in");
      $fadeIn.width(this.viewportWidth);
      $fadeIn.height(this.viewportHeight);

      setTimeout(function(){
         self.effectRandom();
        $fadeIn.fadeOut(1500, function(){
          $fadeIn.remove();
        });

      }, this.square.get('loadTime'));
    },

    flip: function(e){
      $(e.currentTarget).addClass('flip');
    },

    resizeContainer: function(){
      var width  = (this.squareFitX + 2) * this.squareSize;
      var height = (this.squareFitY + 2) * this.squareSize;

      this.$el.width(width);
      this.$el.height(height);

      this.repositionContainer();
    },

    repositionContainer: function(){
      var marginX = (((this.squareFitX + 2) * this.squareSize) - this.viewportWidth) / 2;
      var marginY = (((this.squareFitY + 2) * this.squareSize) - this.viewportHeight) / 2;

      this.$el.css('left', -marginX);
      this.$el.css('top', -marginY);
    },

    addMarginOverlay: function(){
      var marginX = (this.viewportWidth - (this.squareFitX * this.squareSize)) / 2;
      var marginY = (this.viewportHeight - (this.squareFitY * this.squareSize)) / 2;

      $('body').append('<div class="margin-overlay" id="margin-overlay-left"></div>');
      $('body').append('<div class="margin-overlay" id="margin-overlay-right"></div>');
      $('body').append('<div class="margin-overlay" id="margin-overlay-top"></div>');
      $('body').append('<div class="margin-overlay" id="margin-overlay-bottom"></div>');

      if(marginX > 0) {
        $("#margin-overlay-left").css({
          'width': marginX,
          'height': this.viewportHeight
        });
      }

      if(marginX > 0) {
        $("#margin-overlay-right").css({
          'width': marginX,
          'height': this.viewportHeight,
          'right': 0
        });
      }

      if(marginX > 0) {
        $("#marginY-overlay-top").css({
          'width': this.viewportWidth - (marginX * 2),
          'height': marginY,
          'left': marginX
        });
      }

      if(marginY > 0) {
        $("#margin-overlay-bottom").css({
          'width': this.viewportWidth - (marginX * 2),
          'height': marginY,
          'bottom': 0,
          'left': marginX
        });
      }
    },


    // EFFECTS
    effectRandom: function(){
      var self = this;

      setInterval(function(){
        var countStartPosition = $(self.$el.find('.start-position')).length;

        var randomTurnTime = Math.floor(self.turnTimeMin + (Math.random() * ((self.turnTimeMax - self.turnTimeMin) + 1)));
        var randomBlock    = Math.floor(Math.random() * (countStartPosition + 1));
        $(self.$el.find('.start-position')[randomBlock]).addClass('flip');
        $(self.$el.find('.start-position')[randomBlock]).removeClass('start-position');
      }, self.square.get('randomInterval'));
    },

    effectRandomColor: function(){
      this.$el.children().each(function(){
        var randomColor = 'hsl(211, 67%, ' + ((Math.floor(Math.random() * 10)) + 51) + '%)';
        $(this).find('.back').css('background', randomColor);
      });
    }

  });

  new Squares();

});