var LevelService = function() {
    var levels = [];
    var currentLevel = false;
    //LEVEL 1
    levels.push([
        [' ',' ','O',' ',' '],
        [' ','X','X', ' '],
        ['O','_O','X','X','O'],
        ['_O','_O','_O','X'],
        ['_O','X','_O','X','_O'],
        ['X','_O','_O','_O'],
        ['X','_O','O','_O','_O'],
        ['_O','_O','_O','_O']
    ]);
    levels.push([
        [' ', ' ', 'O', ' ', ' '],
        [' ', 'X', 'X', ' '],
        [' ', '_O', '_O', '_O', ' '],
        ['_O', 'O', 'O', '_O'],
        ['X', '_O', '_O', '_O', 'X'],
        ['X', '_O', '_O', '_O'],
        [' ', '_O', 'X', 'X', ' '],
        [' ', ' ', ' ', ' '],
        [' ', '_O', ' ', '_O', ' '],
        [' ', ' ', ' ', ' '],
        [' ', 'X', 'X', '_O', ' '],
        ['_O', '_O', '_O', 'X'],
        ['X', '_O', '_O', '_O', 'X'],
        ['_O', '_O', '_O', '_O'],
        [' ', 'O', 'X', 'O', ' '],
        [' ', '_O', '_O', ' '],
        [' ', ' ', 'X', ' ', ' ']
    ]);
    levels.push([
        [' ', '_O', ' ', '_O', ' ', ' '],
        [' ', '_O', 'X', ' ', ' '],
        [' ', 'C', 'X', 'C', '_O', ' '],
        [' ', 'X', 'X', ' ', 'X'],
        [' ', 'X', '_C', '_O', 'C', '_O'],
        [' ', ' ', ' ', ' ', 'X'],
        ['_O', ' ', '_O', ' ', 'X', 'C'],
        ['X', ' ', ' ', ' ', 'X'],
        ['C', ' ', '_O', '_O', '_C', ' '],
        ['X', '_O', ' ', '_O', 'X'],
        ['X', ' ', 'X', '_O', ' ', ' '],
        ['C', '_O', 'X', '_O', ' '],
        ['_O', ' ', 'C', 'C', ' ', ' '],
        [' ', ' ', 'X', ' ', ' ']
    ]);
    levels.push([
        [' ', '_H', ' '],
        ['X', '_O'],
        ['_O', 'X', '_O'],
        ['X', '_O'],
        ['X', 'O', 'X'],
        ['X', '_O'],
        ['_O', 'X', '_O'],
        ['X', '_O'],
        [' ', '_H', ' ']
    ]);
    var renderLevel = function(level) {

        var levelMap = false,
            renderedLevel = $(document.createElement('section')).attr('id', 'gameboard'),
            trapCount = 0;
        // Step 1: parse array, and create objects
        currentLevel = [];
        if (!isNaN(level)) {
            levelMap = levels[level - 1]
        } else if (level instanceof Array) {
            levelMap = level;
        }
        if (!levelMap) return '';
        for (var rows = 0, max = levelMap.length; rows < max; ++rows) {
            var cellRow = [],
                row = renderRow();
            for (var elem = 0, max2 = levelMap[rows].length; elem < max2; ++elem) {
                var cell = CellFactory.create(elem, rows, levelMap[rows][elem]);
                if (cell && cell.isTrap()) { trapCount += 1; }
                cellRow.push(cell);
                row.append(cell.render());
            }
            renderedLevel.append(row);
            currentLevel.push(cellRow);
        }
        $.event.trigger({
            type: "levelParsed"
        });
        game.updateTrapCounter(trapCount);
        return renderedLevel;
    };

    var renderRow = function() {
            return $(document.createElement('ul')).addClass('hex-row');
        },

        getCellAt = function(x, y) {
            return currentLevel.length > 0 && currentLevel[y][x];
        };

    /*var calculateDirectValue =  function(x, y) {
        var count = 0;
        if (y - 2 >= 0 && currentLevel[y - 2].length > x) {
            if (currentLevel[y - 2][x].isTrap()) { count += 1; }
        }
        if (y + 2 < currentLevel.length && currentLevel[y + 2].length > x) {
            if (currentLevel[y + 2][x].isTrap()) { count += 1; }
        }
        if (y + 1 < currentLevel.length && currentLevel[y + 1].length > x) {
            if (currentLevel[y + 1][x].isTrap()) { count += 1; }
        }
        if (y - 1 >= 0 && currentLevel[y - 1].length > x) {
            if (currentLevel[y - 1][x].isTrap()) { count += 1; }
        }
        if (y % 2 === 1) {
            if (y - 1 >= 0 && currentLevel[y - 1].length > x + 1) {
                if (currentLevel[y - 1][x + 1].isTrap()) { count += 1; }
            }
            if (y + 1 < currentLevel.length && currentLevel[y + 1].length > x + 1) {
                if (currentLevel[y + 1][x + 1].isTrap()) { count += 1; }
            }
        } else {
            if (y - 1 >= 0 && currentLevel[y - 1].length > x - 1 && x - 1 >= 0) {
                if (currentLevel[y - 1][x - 1].isTrap()) { count += 1; }
            }
            if (y + 1 < currentLevel.length && currentLevel[y + 1].length > x - 1 && x - 1 >= 0) {
                if (currentLevel[y + 1][x - 1].isTrap()) { count += 1; }
            }
        }
        return count;
    };*/

    var getSurroundingTraps = function(x, y, depth, callback) {
        var elements = [];
        for (var rows = depth; rows >= 0; --rows) {
            if (rows % 2 === 0) {
                var elemCount = 2 * depth + 1 - rows;
                for (var elem = 0, max = Math.floor(elemCount / 2); elem <= max; ++elem) {
                    var newX = Math.ceil(rows / 2),
                        newY = (max * 2) - (elem * 2);
                    if (y - newY >= 0 && currentLevel[y - newY].length > x - newX && x - newX >= 0) {
                        if (currentLevel[y - newY][x - newX].isTrap()) { elements.push(currentLevel[y - newY][x - newX]); }
                    }
                    if (rows > 0 && elem !== max && y + newY < currentLevel.length && currentLevel[y + newY].length > x - newX && x - newX >= 0) {
                        if (currentLevel[y + newY][x - newX].isTrap()) { elements.push(currentLevel[y + newY][x - newX]); }
                    }
                    if (y + newY < currentLevel.length && currentLevel[y + newY].length > x + newX && x + newX >= 0) {
                        if (currentLevel[y + newY][x + newX].isTrap()) { elements.push(currentLevel[y + newY][x + newX]); }
                    }
                    if (rows > 0 && elem !== max && y - newY >= 0 && currentLevel[y - newY].length > x + newX && x + newX >= 0) {
                        if (currentLevel[y - newY][x + newX].isTrap()) { elements.push(currentLevel[y - newY][x + newX]); }
                    }
                }
            } else {
                if (y % 2 === 0) {
                    var elemCount = 2 * depth + 1 - rows;
                    for (var elem = 0, max = Math.floor(elemCount / 2); elem < max; ++elem) {
                        var newX = Math.ceil(rows / 2),
                            newY = 2 * elem + 1;
                        if (y - newY >= 0 && currentLevel[y - newY].length > x - newX && x - newX >= 0) {
                            if (currentLevel[y - newY][x - newX].isTrap()) { elements.push(currentLevel[y - newY][x - newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x - newX && x - newX >= 0) {
                            if (currentLevel[y + newY][x - newX].isTrap()) { elements.push(currentLevel[y + newY][x - newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x && x >= 0) {
                            if (currentLevel[y + newY][x].isTrap()) { elements.push(currentLevel[y + newY][x]); }
                        }
                        if (y - newY >= 0 && currentLevel[y - newY].length > x && x >= 0) {
                            if (currentLevel[y - newY][x].isTrap()) { elements.push(currentLevel[y - newY][x]); }
                        }
                    }
                }
                else if (y % 2 === 1) {
                    var elemCount = 2 * depth + 1 - rows;
                    for (var elem = 0, max = Math.floor(elemCount / 2); elem < max; ++elem) {
                        var newX = Math.ceil(rows / 2),
                            newY = 2 * elem + 1;
                        if (y - newY >= 0 && currentLevel[y - newY].length > x + newX && x + newX >= 0) {
                            if (currentLevel[y - newY][x + newX].isTrap()) { elements.push(currentLevel[y - newY][x + newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x + newX && x + newX >= 0) {
                            if (currentLevel[y + newY][x + newX].isTrap()) { elements.push(currentLevel[y + newY][x + newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x && x >= 0) {
                            if (currentLevel[y + newY][x].isTrap()) { elements.push(currentLevel[y + newY][x]); }
                        }
                        if (y - newY >= 0 && currentLevel[y - newY].length > x && x >= 0) {
                            if (currentLevel[y - newY][x].isTrap()) { elements.push(currentLevel[y - newY][x]); }
                        }
                    }
                }
            }
        }
        return callback(elements);
    };

    return {
        getLevel: renderLevel,
        getSurroundingTrapCount: function(x, y, depth) {
            this.highliteSurroundingCells(x, y, depth);
            return getSurroundingTraps(x, y, depth, function(elements) {
               return elements.length;
            });
        },
        highliteSurroundingCells: function(x, y, depth) {
            return getSurroundingTraps(x, y, depth, function(elements) {
                $.each(elements, function() { this.highlite(); });
            });
        },
        getCellAt: getCellAt
    };
}();