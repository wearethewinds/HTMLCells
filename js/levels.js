var LevelService = function() {
    var levels = [];
    var currentLevel = false;
    //LEVEL 1
    levels.push([
        [' ',' ','_O',' ',' '],
        [' ','X','X', ' '],
        ['_O','O','X','X','_O'],
        ['O','O','O','X'],
        ['O','X','O','X','O'],
        ['X','O','O','O'],
        ['X','O','_O','O','O'],
        ['O','O','O','O']
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
        [' ', 'O', ' ', 'O', ' ', ' '],
        [' ', 'O', 'X', ' ', ' '],
        [' ', '_C', 'X', '_C', 'O', ' '],
        [' ', 'X', 'X', ' ', 'X'],
        [' ', 'X', 'C', 'O', '_C', 'O'],
        [' ', ' ', ' ', ' ', 'X'],
        ['O', ' ', 'O', ' ', 'X', '_C'],
        ['X', ' ', ' ', ' ', 'X'],
        ['_C', ' ', 'O', 'O', 'C', ' '],
        ['X', 'O', ' ', 'O', 'X'],
        ['X', ' ', 'X', 'O', ' ', ' '],
        ['_C', 'O', 'X', 'O', ' '],
        ['O', ' ', '_C', '_C', ' ', ' '],
        [' ', ' ', 'X', ' ', ' ']
    ]);
    levels.push([
        [' ', 'H', ' '],
        ['X', 'O'],
        ['O', 'X', 'O'],
        ['X', 'O'],
        ['X', '_O', 'X'],
        ['X', 'O'],
        ['O', 'X', 'O'],
        ['X', 'O'],
        [' ', 'H', ' ']
    ]);
    var renderLevel = function(level) {

        var levelMap = false,
            renderedLevel = $(document.createElement('section')).attr('id', 'gameboard'),
            trapCount = 0,
            row = null,
            cell = null;
        if (currentLevel) {
            for (row = currentLevel.length - 1; row >= 0; --row) {
                for(cell = currentLevel[row].length - 1; cell >= 0; --cell) {
                    currentLevel[row][cell]._destroy;
                }
            }
        }
        // Step 1: parse array, and create objects
        currentLevel = [];
        if (!isNaN(level)) {
            levelMap = levels[level - 1]
        } else if (level instanceof Array) {
            levelMap = level;
        }
        if (!levelMap) return '';
        for (var rows = 0, max = levelMap.length; rows < max; ++rows) {
            var cellRow = [];
            row = renderRow();
            for (var elem = 0, max2 = levelMap[rows].length; elem < max2; ++elem) {
                cell = CellFactory.create(elem, rows, levelMap[rows][elem]);
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

    var getCellsOnLine = function(x,y, direction,condition, callback) {
        var elements = [],
            elemCount = 0,
            elem = null,
            rows = null,
            newX = 0;
        if (direction === 'SOUTH') {
            for (rows = y; rows <= currentLevel.length - 1; rows += 2) {
                if (x < currentLevel[rows].length && condition(currentLevel[rows][x])) { elements.push(currentLevel[rows][x]); }
            }
        }
        if (direction === 'SOUTHEAST') {
            newX = x;
            for (rows = y; rows <= currentLevel.length - 1; ++rows) {
                console.log(currentLevel[rows][newX]);
                if (newX < currentLevel[rows].length && condition(currentLevel[rows][newX])) { elements.push(currentLevel[rows][newX]); }
                if (rows % 2 === 1) { ++newX; }
            }
        }
        if (direction === 'SOUTHWEST') {
            newX = x;
            for (rows = y; rows <= currentLevel.length - 1; ++rows) {
                if (newX >= 0 && condition(currentLevel[rows][newX])) { elements.push(currentLevel[rows][newX]); }
                if (rows % 2 === 0) { --newX; }
            }
        }

        return callback(elements);
    },

    getSurroundingCells = function(x, y, depth, condition, callback) {
        var elements = [],
            elemCount = 0,
            newX = 0,
            newY = 0,
            elem = null;
        for (var rows = depth; rows >= 0; --rows) {
            if (rows % 2 === 0) {
                elemCount = 2 * depth + 1 - rows;
                for (elem = 0, max = Math.floor(elemCount / 2); elem <= max; ++elem) {
                    newX = Math.ceil(rows / 2);
                    newY = (max * 2) - (elem * 2);
                    if (y - newY >= 0 && currentLevel[y - newY].length > x - newX && x - newX >= 0) {
                        if (condition(currentLevel[y - newY][x - newX])) { elements.push(currentLevel[y - newY][x - newX]); }
                    }
                    if (rows > 0 && elem !== max && y + newY < currentLevel.length && currentLevel[y + newY].length > x - newX && x - newX >= 0) {
                        if (condition(currentLevel[y + newY][x - newX])) { elements.push(currentLevel[y + newY][x - newX]); }
                    }
                    if (y + newY < currentLevel.length && currentLevel[y + newY].length > x + newX && x + newX >= 0) {
                        if (condition(currentLevel[y + newY][x + newX])) { elements.push(currentLevel[y + newY][x + newX]); }
                    }
                    if (rows > 0 && elem !== max && y - newY >= 0 && currentLevel[y - newY].length > x + newX && x + newX >= 0) {
                        if (condition(currentLevel[y - newY][x + newX])) { elements.push(currentLevel[y - newY][x + newX]); }
                    }
                }
            } else {
                if (y % 2 === 0) {
                    elemCount = 2 * depth + 1 - rows;
                    for (elem = 0, max = Math.floor(elemCount / 2); elem < max; ++elem) {
                        newX = Math.ceil(rows / 2);
                        newY = 2 * elem + 1;
                        if (y - newY >= 0 && currentLevel[y - newY].length > x - newX && x - newX >= 0) {
                            if (condition(currentLevel[y - newY][x - newX])) { elements.push(currentLevel[y - newY][x - newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x - newX && x - newX >= 0) {
                            if (condition(currentLevel[y + newY][x - newX])) { elements.push(currentLevel[y + newY][x - newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x && x >= 0) {
                            if (condition(currentLevel[y + newY][x])) { elements.push(currentLevel[y + newY][x]); }
                        }
                        if (y - newY >= 0 && currentLevel[y - newY].length > x && x >= 0) {
                            if (condition(currentLevel[y - newY][x])) { elements.push(currentLevel[y - newY][x]); }
                        }
                    }
                }
                else if (y % 2 === 1) {
                    elemCount = 2 * depth + 1 - rows;
                    for (elem = 0, max = Math.floor(elemCount / 2); elem < max; ++elem) {
                        newX = Math.ceil(rows / 2);
                        newY = 2 * elem + 1;
                        if (y - newY >= 0 && currentLevel[y - newY].length > x + newX && x + newX >= 0) {
                            if (condition(currentLevel[y - newY][x + newX])) { elements.push(currentLevel[y - newY][x + newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x + newX && x + newX >= 0) {
                            if (condition(currentLevel[y + newY][x + newX])) { elements.push(currentLevel[y + newY][x + newX]); }
                        }
                        if (y + newY < currentLevel.length && currentLevel[y + newY].length > x && x >= 0) {
                            if (condition(currentLevel[y + newY][x])) { elements.push(currentLevel[y + newY][x]); }
                        }
                        if (y - newY >= 0 && currentLevel[y - newY].length > x && x >= 0) {
                            if (condition(currentLevel[y - newY][x])) { elements.push(currentLevel[y - newY][x]); }
                        }
                    }
                }
            }
        }
        return callback(elements);
    };

    return {
        getLevel: renderLevel,
        checkCompleteness: function () {
            for (var row = currentLevel.length - 1; row >= 0; --row) {
                for(var cell = currentLevel[row].length - 1; cell >= 0; --cell) {
                    if (currentLevel[row][cell].covert) { return false; }
                }
            }
            return true;
        },
        getHintOnLine: function (cell, direction) {
            return getCellsOnLine(cell.x, cell.y, direction, function(cellOnLine) {
                return typeof cellOnLine.isTrap === 'function' && cellOnLine.isTrap();
            }, function(elements) {
                console.log(elements.length);
            })
        },
        getSurroundingTrapCount: function(cell) {
            return getSurroundingCells(cell.x, cell.y, cell.searchDepth, function(surroundedCell) {
                return typeof surroundedCell.isTrap === 'function' && surroundedCell.isTrap() && !cell.compare(surroundedCell);
            }, function(elements) {
               return elements.length;
            });
        },
        highliteSurroundingCells: function(cell) {
            return getSurroundingCells(cell.x, cell.y, cell.searchDepth, function(surroundedCell) {
                return !!surroundedCell && !cell.compare(surroundedCell);
            }, function(elements) {
                $.each(elements, function(i) { var t = this; setTimeout(function() { t.highlite(); }, i * 15); });
            });
        },
        unliteSurroundingCells: function(cell) {
            return getSurroundingCells(cell.x, cell.y, cell.searchDepth, function(surroundedCell) {
                return !!surroundedCell && !cell.compare(surroundedCell);
            }, function (elements) {
                $.each(elements, function (i) { var t = this; setTimeout(function() { t.unlite(); }, i * 15); })
            });
        },
        getCellAt: getCellAt
    };
}();