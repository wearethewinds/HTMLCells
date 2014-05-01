
var Cell = function(x, y, entity) {
    this.x = x;
    this.y = y;
    this.entity = entity;
    this.marked = false;
    this.init();
};

Cell.prototype = function() {

    var determineType = function() {
        if (this.entity === ' ') {
            this.type = 'free';
        } else if (/^(.*?)O/.test(this.entity)) {
            this.type = 'number';
        } else if (this.entity === 'X') {
            this.type = 'trap';
        }

        if (!/^_/.test(this.entity)) {
            if (this.entity === 'O') { this.marked = true;}
        }

    };

    var registerMouseHandler = function() {
        var t = this;
        if ((this.type === 'number' || this.type === 'trap') && !this.marked) {
            this.element.on('click', function(e) {
                e.preventDefault();
                leftClickHandler.call(t);
            })
            this.element.on('contextmenu', function(e) {
                e.preventDefault();
                rightClickHandler.call(t);
            });
        };
    };

    var unregisterMouseHandler = function() {
        this.element.off('click contextmenu');
    }

    var leftClickHandler = function() {
        if (this.type === 'trap') {
            this.element.addClass('marked');
            unregisterMouseHandler.call(this);
        }
    }

    var rightClickHandler = function() {
        if (this.type === 'number') {
            this.element.addClass('open');
            this.marked = true;
            this.render();
            unregisterMouseHandler.call(this);
        }
        if (this.type === 'trap') {
            shakeTween.call(this.element, 3);
        }
    }

    var init = function() {
        determineType.call(this);
        createElement.call(this);
        this.content = false;
        registerMouseHandler.call(this);
    }

    var calculate = function() {
        if (this.type === 'number' && this.content === false) {
            this.content = game.calculateHintAtPosition(this.x, this.y);
        }
        return this.content;
    }

    var createElement = function() {
        this.element = $(document.createElement('li'));
        this.element.append(document.createElement('span'));
        this.element.addClass('hex');
    };

    var render = function() {
        switch (this.type) {
            case 'free':
                this.element.addClass('hide');
                break;
            case 'number':
                if (!this.marked) { break; }
                this.element.find('span').html(calculate.call(this));
                this.element.addClass('open');
                break;
        }
        return this.element;
    };

    var isTypeOf = function() {
        return this.type;
    };

    function shakeTween(repeatCount) {
        var t = this;
        TweenMax.to(t, 0.1,{repeat:repeatCount-1, y:(1+Math.random()*5), x:(1+Math.random()*5), delay:0.1, ease:'Expo.easeInOut', onComplete: function() {
                t.removeAttr('style');
        }});
    }


return {
        render: render,
        init: init,
        isTypeOf: isTypeOf
    }
}();