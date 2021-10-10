const {countOnFirstRow, countOnLastRow, countOnMiddleRow} = require("./gameOfLife");

describe ("Given a countOnFirstRow function", () => {
	describe ("when it receives a 0 and a 0",  () =>  {
		test ("then it returns 1",  () =>  {
      const matrix = [
        [0,0,0,0,0], 
        [1,0,0,0,0],
        [0,1,0,0,0]
      ];
			const inputCell = [0, 0];
      const expected = 1;
      
      const result = countOnFirstRow(inputCell);
      
      expect(result).toEqual(expected);
    });
  });
});

describe("Given a countOnLastRow function", () => { 
  describe ("when it receives a 2 and a 0", () =>  {
		test ("then it returns 2",  () =>  {
      const matrix = [
        [0,0,0,0,0], 
        [1,0,0,0,0],
        [0,1,0,0,0]
      ];
			const inputCell = [2, 0];
      const expected = 2;
      
      const result = countOnLastRow(inputCell);
      
      expect(result).toEqual(expected);
    });
  });
});
