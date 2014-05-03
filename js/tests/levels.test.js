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
       expect(LevelService.calculateDirectValue(2, 0)).toEqual(3);
    });

    it('should return no surrounding traps for cell (x: 0, y: 2) in level 1', function() {
        expect(LevelService.calculateDirectValue(0, 2)).toEqual(0);
    });
});