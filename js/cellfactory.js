var CellFactory = function() {

    var create = function(x, y, entity) {
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
                cell = new ConcatenatedCell(params);
            } else if (/^(_?)X\b/.test(entity)) {
                cell = new TrapCell(params);
            } else if(/^(_?)D\b/.test(entity)) {
                cell = new DisruptedCell(params);
            } else if (/^(_?)H\b/.test(entity)) {
                cell = new HintTrapCell(params);
            }
            if (cell.init && typeof cell.init === 'function') {
                cell.init();
            }
            return cell;
        };

    return {
        create: create
    };
}();