var CellFactory = function() {

    var /*HintTrapCell = function(x, y, marked) {
            this.x = x;
            this.y = y;
            this.marked = marked;
        },*/

        ConcatenatedCell = function(x, y, covert) {
            this.x = x;
            this.y = y;
            this.covert = covert;
        },

        DisruptedCell = function(x, y, covert) {
            this.x = x;
            this.y = y;
            this.covert = covert;
        },

        registerMouseHandler = function(leftClick, rightClick) {
            var t = this;
            if (leftClick && typeof leftClick === 'function') {
                this.element.on('click', function(e) {
                    e.preventDefault();
                    leftClick.call(t);
                });
            }
            if (rightClick && typeof rightClick === 'function') {
                this.element.on('contextmenu', function(e) {
                    e.preventDefault();
                    rightClick.call(t);
                });
            }

        },

        unregisterMouseHandler = function() {
            this.element.off('click contextmenu');
        },


        createElement = function() {
            var element = $(document.createElement('li'));
            element.append(document.createElement('span'));
            element.addClass('hex');
            return element;
        },

        isTrap = function() {
          return (this instanceof TrapCell) || (this instanceof HintTrapCell);
        },

        leftClickHandler = function() {
            if (!this.covert) { return; }
            game.increaseFaultCounter();
            Animations.shake.call(this.element, 3);
        },

        rightClickHsndler = function() {
            this.element.addClass('open');
            this.covert = false;
            this.render();
            unregisterMouseHandler.call(this);
        },

        highlite = function() {
            if (!this.highlit) {
                this.element.css({opacity: 0.5});
                this.highlit = true;
            }
            else {
                this.element.css({opacity: ''});
                this.highlit = false;
            }
        },

        create = function(x, y, entity) {
            var cell = false;
            var params = {
                x: x,
                y: y,
                covert: !/^_/.test(entity)
            };
            if (entity === ' ') {
                cell = new FreeCell(x, y);
            } else if (/^(_?)O\b/.test(entity)) {
                cell = new SimpleCell(params);
            } else if (/^(_?)C\b/.test(entity)) {
                cell = new ConcatenatedCell(x, y, /^_/.test(entity));
            } else if (/^(_?)X\b/.test(entity)) {
                cell = new TrapCell(params);
            } else if(/^(_?)D\b/.test(entity)) {
                cell = new DisruptedCell(x, y, /^_/.test(entity));
            } else if (/^(_?)H\b/.test(entity)) {
                cell = new HintTrapCell(params);
            }
            if (cell.init && typeof cell.init === 'function') {
                cell.init();
            }
            return cell;
        };

    ConcatenatedCell.prototype = function() {

        var init = function() {
                var t = this;
                t.element = createElement.call(t);
                t.content = null;
                registerMouseHandler.call(t, leftClickHandler, rightClickHsndler);
                $(document).on('levelParsed', function() {
                    t.initialized = true;
                    t.render();
                });
            };

            var render = function() {
                if (!this.covert && this.initialized) {
                    this.element.find('span').html('{' + calculate.call(this) + '}');
                    this.element.addClass('open');
                }
                return this.element;
            },

            calculate = function() {
                if (this.content === false) {
                    this.content = LevelService.getSurroundingTrapCount(this);
                }
                return this.content;
            };

        return {
            highlite: highlite,
            init: init,
            render: render,
            isTrap: isTrap
        }
    }();

    DisruptedCell.prototype = function() {

        var init = function() {
                var t = this;
                t.element = createElement.call(t);
                t.content = null;
                registerMouseHandler.call(t, leftClickHandler, rightClickHsndler);
                $(document).on('levelParsed', function() {
                    t.initialized = true;
                    t.render();
                });
            };

        var render = function() {
                if (!this.covert && this.initialized) {
                    this.element.find('span').html('-' + calculate.call(this) + '-');
                    this.element.addClass('open');
                }
                return this.element;
            },

            calculate = function() {
                if (this.content === false) {
                    this.content = LevelService.getSurroundingTrapCount(this);
                }
                return this.content;
            };

        return {
            highlite: highlite,
            init: init,
            render: render,
            isTrap: isTrap
        }
    }();

    return {
        create: create
    };
}();