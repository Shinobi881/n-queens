/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined;


  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var hasConflict = false;
  var row = 0;
  var col = 0;
  

  // console.log('board', board);

  if(n > 0){
    var recurseFxn = function(row, col){
      //initialize board with piece in the top left corner 
      // console.log('board[row][col]', board.attributes[row][col]);
      // console.log('board[row]', board.attributes[row]);
      board.attributes[row][col] = 1;

      //check for conflict
      hasConflict = board.hasAnyRooksConflicts();

      if(hasConflict){
        console.log('conflicts!!!');
        // if the piece is in the last column
        if(col === n-1){
          //INCLUDE BACKTRACKING HERE
          console.log('we need to add backtracking here');
        };
        //remove the piece, 
        board.attributes[row][col] = 0; 
        //increment column of current piece
        col++;
        board.attributes[row][col] = 1;
        //recurse
        recurseFxn(row, col); 
      } else {
        console.log('NOOOOO conflicts!!!');
        console.log('solutionCount is ', solutionCount);
        if(row === n-1){
          //this is a solution
          solutionCount++;        
          //INCLUDE BACKTRACKING HERE
          console.log('we need to add backtracking here');
        } else {
        //go to next row
          row++;
          //start at the initial col
          col = 0;
          //recurse
          recurseFxn(row, col); 
          solutionCount++;
        }  
      }
    }
    recurseFxn(row, col);
  }

  // recurseFxn = function(row, col){
  //   //initialize board with piece in the top left corner 
  //   board[row][col] = 1;

  //   //increment row, add a piece
  //   row++;
      
  //   //check for conflict
  //   hasConflict = board.hasAnyRooksConflicts;

  //   //if there is a conflict, 
  //   if(hasConflict){
  //     //if the piece is in the last column
  //     if(col === n-1){
  //       //INCLUDE BACKTRACKING HERE
  //       console.log('we need to add backtracking here');
  //     };
  //     //remove the piece, 
  //     board[row][col] = 0; 
  //     //increment column of current piece
  //     col++;
  //     board[row][col] = 1; 
  //   } 
  //   // if there is no conflict
  //   else {
  //     if(row === n-1){
  //       //this is a solution
  //       solutionCount++;        
  //       //INCLUDE BACKTRACKING HERE
  //       console.log('we need to add backtracking here');
  //     }
  //     //go to next row
  //     row++;
  //     //start at the initial col
  //     col = 0;
  //     //recurse
  //     recurseFxn(row, col)
  //   }
  // }(row, col);









  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
