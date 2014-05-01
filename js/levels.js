var LevelService = function() {
};

LevelService.prototype = function() {
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
    var renderLevel = function(level) {
        currentLevel = [];
        var levelMap = levels[level - 1];
        var renderedLevel = $(document.createElement('section'));
        for (var rows = 0, max = levelMap.length; rows < max; ++rows) {
            var cellRow = [];
            for (var elem = 0, max2 = levelMap[rows].length; elem < max2; ++elem) {
                var cell = new Cell(elem, rows, levelMap[rows][elem]);
                cellRow.push(cell);
            }
            currentLevel.push(cellRow);
        }
        for (var rows = 0, max = currentLevel.length; rows < max; ++rows) {
            var row = renderRow();
            for (var elem = 0, max2 = currentLevel[rows].length; elem < max2; ++elem) {
                row.append(currentLevel[rows][elem].render());
            }
            renderedLevel.append(row);
        }
        return renderedLevel;
    }
    var renderRow = function() {
        return $(document.createElement('ul')).addClass('hex-row');
    };

    var calculateDirectValue =  function(x, y) {
        var count = 0;
        if (y - 2 >= 0 && currentLevel[y - 2].length > x) {
            if (currentLevel[y - 2][x].isTypeOf() === 'trap') { count += 1; }
        }
        if (y + 2 < currentLevel.length && currentLevel[y + 2].length > x) {
            if (currentLevel[y + 2][x].isTypeOf() === 'trap') { count += 1; }
        }
        if (y + 1 < currentLevel.length && currentLevel[y + 1].length > x) {
            if (currentLevel[y + 1][x].isTypeOf() === 'trap') { count += 1; }
        }
        if (y - 1 >= 0 && currentLevel[y - 1].length > x) {
            if (currentLevel[y - 1][x].isTypeOf() === 'trap') { count += 1; }
        }
        if (y % 2 === 1) {
            if (y - 1 >= 0 && currentLevel[y - 1].length > x + 1) {
                if (currentLevel[y - 1][x + 1].isTypeOf() === 'trap') { count += 1; }
            }
            if (y + 1 < currentLevel.length && currentLevel[y + 1].length > x + 1) {
                if (currentLevel[y + 1][x + 1].isTypeOf() === 'trap') { count += 1; }
            }
        } else {
            if (y - 1 >= 0 && currentLevel[y - 1].length > x - 1 && x - 1 >= 0) {
                if (currentLevel[y - 1][x - 1].isTypeOf() === 'trap') { count += 1; }
            }
            if (y + 1 < currentLevel.length && currentLevel[y + 1].length > x - 1 && x - 1 >= 0) {
                if (currentLevel[y + 1][x - 1].isTypeOf() === 'trap') { count += 1; }
            }
        }

        return count;
    }

    return {
        getLevel: renderLevel,
        calculateDirectValue: calculateDirectValue
    };
}();