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
    var renderLevel = function(level) {
        currentLevel = [];
        var levelMap = levels[level - 1],
            renderedLevel = $(document.createElement('section')).attr('id', 'gameboard'),
            trapCount = 0;
        // Step 1: parse array, and create objects
        for (var rows = 0, max = levelMap.length; rows < max; ++rows) {
            var cellRow = [],
                row = renderRow();
            for (var elem = 0, max2 = levelMap[rows].length; elem < max2; ++elem) {
                if (levelMap[rows][elem] === 'X') { trapCount += 1; }
                var cell = CellFactory.create(elem, rows, levelMap[rows][elem]);
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
    };

    var calculateDirectValue =  function(x, y) {
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
    };

    return {
        getLevel: renderLevel,
        calculateDirectValue: calculateDirectValue
    };
}();