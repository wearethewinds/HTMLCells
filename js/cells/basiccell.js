var BasicCell = function () {
    var args = arguments[0] || {};
    this.x = args.x;
    this.y = args.y;
    this.content = '';
    this.covert = args.covert;
    this.element = null;
    this.highlit = 0;
    this.searchDepth = 1;
    this._init();
}

BasicCell.prototype = function () {

    var _destroy = function () {
        this.unregisterLeftClick();
        this.unregisterRightClick();
        this.element = null;
    }

    var _init = function () {
        var t = this;
        if (!t.element) { t.element = t.createElement(); }
        $(document).on('levelParsed', function() {
            t.initialized = true;
            t.render();
        });
    }

    var calculate = function () {
        if (this.content === '') {
            this.content = LevelService.getSurroundingTrapCount(this.x, this.y, this.searchDepth);
        }
        return this.content;
    }

    var createElement = function () {
        var element = $(document.createElement('li'));
        element.append(document.createElement('span'));
        element.addClass('hex');
        return element;
    }

    var getHighliteValue = function () {
        return .5 - (Math.log(this.highlit) / 2);
    }

    var highlite = function () {
        ++this.highlit;
        this.render();
    }

    var isTrap = function () {
        return false;
    }

    var registerLeftClick = function (event) {
        var t = this;
        if (!t.element) { t.element = t.createElement(); }
        if (event && typeof event === 'function') {
            t.element.on('click', function (e) {
                e.preventDefault();
                event.call(t);
            });
        }
    };

    var registerRightClick = function (event) {
        var t = this;
        if (!t.element) { t.element = t.createElement(); }
        if (event && typeof event === 'function') {
            this.element.on('contextmenu', function (e) {
                e.preventDefault();
                event.call(t);
            });
        }
    }

    var render = function  () {
        if (!this.covert && this.initialized) {
            this.element.find('span').html(calculate.call(this));
            this.element.addClass('open');
        }
        if (this.highlit > 0) {
            this.element.css('opacity', this.getHighliteValue());
        } else {
            this.element.css('opacity', '');
        }
        return this.element;
    };

    var unlite = function () {
        --this.highlit;
        this.render();
    };

    var unregisterLeftClick = function () {
        this.element.off('click');
    }

    var unregisterRightClick = function () {
        this.element.off('contextmenu');
    }


    return {
        _detroy: _destroy,
        _init: _init,
        calculate: calculate,
        createElement: createElement,
        getHighliteValue: getHighliteValue,
        highlite: highlite,
        isTrap: isTrap,
        registerLeftClick: registerLeftClick,
        registerRightClick: registerRightClick,
        unlite: unlite,
        unregisterLeftClick: unregisterLeftClick,
        unregisterRightClick: unregisterRightClick,
        render: render
    }

}();