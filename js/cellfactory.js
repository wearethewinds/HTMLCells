var CellFactory = function() {

    var SimpleCell = function(x, y, covert) {
            this.x = x;
            this.y = y;
            this.covert = covert;
        },
        TrapCell = function(x, y) {
            this.x = x;
            this.y = y;
            this.covert = true;
        },
        FreeCell = function(x, y) {
            this.x = x;
            this.y = y;
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
          return this instanceof TrapCell;
        },

        Animations = {
            shake: function(repeat) {
                var t = this;
                TweenMax.to(t, 0.1,
                    {
                        repeat: repeat - 1,
                        y: (1 + Math.random() * 5),
                        x: (1 + Math.random() * 5),
                        delay: 0.1,
                        ease: 'Expo.easeInOut',
                        onComplete: function() {
                            t.removeAttr('style');
                    }
                });
            }
        },

        create = function(x, y, entity) {
            var cell = false;
            if (entity === ' ') {
                cell = new FreeCell(x, y);
            } else if (/^(.*?)O/.test(entity)) {
                cell = new SimpleCell(x, y, /^_/.test(entity));
            } else if (entity === 'X') {
                cell = new TrapCell(x, y);
            }
            cell.init();
            return cell;
        };

    SimpleCell.prototype = function() {
        var init = function() {
                var t = this;
                t.element = createElement.call(t);
                t.content = false;
                registerMouseHandler.call(t, leftClickHandler, rightClickHandler);
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

            leftClickHandler = function() {
                game.increaseFaultCounter();
                Animations.shake.call(this.element, 3);
            },

            rightClickHandler = function() {
                this.element.addClass('open');
                this.covert = false;
                this.render();
                unregisterMouseHandler.call(this);
            },

            calculate = function() {
                if (this.content === false) {
                    this.content = LevelService.calculateDirectValue(this.x, this.y);
                }
                return this.content;
            };

        return {
            init: init,
            render: render,
            isTrap: isTrap
        };
    }();

    TrapCell.prototype = function() {
        var init = function() {
                var t = this;
                t.element = createElement.call(t);
                t.content = false;
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
            isTrap: isTrap
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
        }
    }();

    return {
        create: create
    }
}();