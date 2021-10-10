const {countNeighbours} = require("./gameOfLife");


describe("Given a countNeightbours function", () => { 
  describe ("when it receives a 0 for row and a 0 for column", () =>  {
		test ("then it returns 2 alive neighbours",  () =>  {
      const matrix = [
        [0,0,0,0,0], 
        [1,1,0,0,0],
        [0,0,0,0,0]
      ];
			const row = 0;
      const column = 0;
      const expected = 2;
      
      const result = countNeighbours(row, column, matrix);
      
      expect(result).toEqual(expected);
    });
  });
});
