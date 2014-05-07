describe('LevelService test', function() {
    var level = false;
    beforeEach(function() {
        level = LevelService.getLevel(1);
    });

    it('should return 36 list items and consists of 8 rows for level 1', function() {
        expect(level.find('li').length).toEqual(36);
        expect(level.find('.hex-row').length).toEqual(8);
    });

    it('should return three surrounding traps for cell (x: 2, y: 0) in level 1', function() {
       expect(LevelService.calculateSurroundingValue(2, 0, 1)).toEqual(3);
    });

    it('should return two surrounding traps for cell (x: 0, y: 3) in level 1', function() {
        expect(LevelService.calculateSurroundingValue(0, 3, 1)).toEqual(2);
    });

    it('should return no surrounding traps for cell (x: 0, y: 2) in level 1', function() {
        expect(LevelService.calculateSurroundingValue(0, 2, 1)).toEqual(0);
    });
});