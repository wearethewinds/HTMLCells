var CellFactory = function() {

    var SimpleCell = function(x, y, covert) {
            this.x = x;
            this.y = y;
            this.covert = covert;
        },

        TrapCell = function(x, y, marked) {
            this.x = x;
            this.y = y;
            this.marked = marked;
        },

        HintTrapCell = function(x, y, marked) {
            this.x = x;
            this.y = y;
            this.marked = marked;
        },

        FreeCell = function(x, y) {
            this.x = x;
            this.y = y;
        },

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

        hintCellleftClickHandler = function() {
            game.increaseFaultCounter();
            Animations.shake.call(this.element, 3);
        },

        hintCellrightClickHandler = function() {
            this.element.addClass('open');
            this.covert = false;
            this.render();
            unregisterMouseHandler.call(this);
        },

        highlite = function() {
            this.element.css({opacity: 0.5});
        },

        create = function(x, y, entity) {
            var cell = false;
            if (entity === ' ') {
                cell = new FreeCell(x, y);
            } else if (/^(_?)O\b/.test(entity)) {
                cell = new SimpleCell(x, y, /^_/.test(entity));
            } else if (/^(_?)C\b/.test(entity)) {
                cell = new ConcatenatedCell(x, y, /^_/.test(entity));
            } else if (/^(_?)X\b/.test(entity)) {
                cell = new TrapCell(x, y, /^_/.test(entity));
            } else if(/^(_?)D\b/.test(entity)) {
                cell = new DisruptedCell(x, y, /^_/.test(entity));
            } else if (/^(_?)H\b/.test(entity)) {
                cell = new HintTrapCell(x, y, /^_/.test(entity));
            }
            if (cell.init && typeof cell.init === 'function') {
                cell.init();
            }
            return cell;
        };

    SimpleCell.prototype = function() {
        var init = function() {
                var t = this;
                t.element = createElement.call(t);
                t.content = false;
                registerMouseHandler.call(t, hintCellleftClickHandler, hintCellrightClickHandler);
                $(document).on('levelParsed', function() {
                    t.initialized = true;
                    t.render();
                });
            },

            render = function() {
                if (!this.covert && this.initialized) {
                    this.element.find('span').html(calculate.call(this));
                    this.element.addClass('open');
                }
                return this.element;
            },

            calculate = function() {
                if (this.content === false) {
                    this.content = LevelService.getSurroundingTrapCount(this.x, this.y, 1);
                }
                return this.content;
            };

        return {
            init: init,
            render: render,
            isTrap: isTrap
        };
    }();

    ConcatenatedCell.prototype = function() {

            var render = function() {
                if (!this.covert && this.initialized) {
                    this.element.find('span').html('{' + calculate.call(this) + '}');
                    this.element.addClass('open');
                }
                return this.element;
            },

            calculate = function() {
                if (this.content === false) {
                    this.content = LevelService.getSurroundingTrapCount(this.x, this.y, 1);
                }
                return this.content;
            }

        return {
            init: SimpleCell.prototype.init,
            render: render,
            isTrap: isTrap
        }
    }();

    DisruptedCell.prototype = function() {

        var render = function() {
                if (!this.covert && this.initialized) {
                    this.element.find('span').html('-' + calculate.call(this) + '-');
                    this.element.addClass('open');
                }
                return this.element;
            },

            calculate = function() {
                if (this.content === false) {
                    this.content = LevelService.getSurroundingTrapCount(this.x, this.y, 1);
                }
                return this.content;
            }

        return {
            init: SimpleCell.prototype.init,
            render: render,
            isTrap: isTrap
        }
    }();

    TrapCell.prototype = function() {
        var init = function() {
                var t = this;
                t.element = createElement.call(t);
                if (!t.marked) {
                    registerMouseHandler.call(t, leftClickHandler, rightClickHandler);
                }

            },

            render = function() {
                if (this.marked) {
                    this.element.addClass('marked');
                }
                return this.element;
            },

            leftClickHandler = function() {
                this.element.addClass('marked');
                unregisterMouseHandler.call(this);
                game.decreaseTrapCounter();
                this.marked = true;
            },

            rightClickHandler = function() {
                game.increaseFaultCounter();
                Animations.shake.call(this.element, 3);
            };

        return {
            init: init,
            render: render,
            isTrap: isTrap,
            highlite: highlite
        };
    }();

    HintTrapCell.prototype = function() {
        var init = function() {
                var t = this;
                t.content = false;
                t.element = createElement.call(t);
                registerMouseHandler.call(t, leftClickHandler, rightClickHandler);
            },

            render = function() {
                return this.element;
            },

            leftClickHandler = function() {
                this.element.addClass('marked');
                unregisterMouseHandler.call(this);
                game.decreaseTrapCounter();
                this.covert = false;
            },

            rightClickHandler = function() {
                game.increaseFaultCounter();
                Animations.shake.call(this.element, 3);
            };

        return {
            init: init,
            render: render,
            isTrap: isTrap,
            highlite: highlite
        };
    }();

    FreeCell.prototype = function() {
        var init = function() {
                var t = this;
                t.element = createElement.call(t);
            },

            render = function() {
                this.element.addClass('hide');
                return this.element;
            };

        return {
            init: init,
            render: render,
            isTrap: isTrap
        };
    }();

    return {
        create: create
    };
}();