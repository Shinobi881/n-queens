// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var hasConflict = false;
      var rowSum = null;

      _.each(this.get(rowIndex), function(val){
        rowSum += val;
      });

      if(rowSum > 1){
        hasConflict = true;
      }

      return hasConflict;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasConflict = false;
      var dimension = this.attributes.n;
      //create a var to store hasRowConflictAt fxn result initialize it to false and return this var
      //pass in hasRowConflictAt the nth property of this.attributes
      for(var i = 0; i < (dimension); i++){
        hasConflict = this.hasRowConflictAt(i);
        if(hasConflict){
          return true;
        }
      }


      return hasConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var hasConflict = false;
      var columnSum = 0;
      var dimension = this.attributes.n;

      for(var i = 0; i < dimension; i++){
        //console.log('this.attributes[i]', this.attributes[i]);
       // console.log('this.attributes[i][colIndex]', this.attributes[i][colIndex]);
        columnSum += this.attributes[i][colIndex];
        //console.log('columnSum ', columnSum);
      }

      if(columnSum > 1){
        hasConflict = true;
      }

      return hasConflict;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasConflict = false;
      var dimension = this.attributes.n;

      for(var i = 0; i < dimension; i++){
        hasConflict = this.hasColConflictAt(i);
        if(hasConflict){
          return true;
        }
      }


      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // console.log('asklfghkhf', majorDiagonalColumnIndexAtFirstRow);
      // console.log('this.attributes[majorDiagonalColumnIndexAtFirstRow]', this.attributes[majorDiagonalColumnIndexAtFirstRow]);
      // console.log('this.attributes[0][majorDiagonalColumnIndexAtFirstRow]', this.attributes[0][majorDiagonalColumnIndexAtFirstRow]);

      var hasConflict = false;
      var dimension = this.attributes.n;
      var sum = 0;
      var row = 0;
      var col = majorDiagonalColumnIndexAtFirstRow;

      if(col < 0){
        row = col * (-1);
        col = 0;
      }


      for(var i = 0; i < dimension; i++){
        if(this.attributes[row + i] === undefined){
          return hasConflict;
        }
        // console.log('this.attributes[row + i][col + i]', this.attributes[row + i][col + i]);
        // console.log('this.attributes[row + i]', this.attributes[row + i]);

        sum += this.attributes[row + i][col + i];

        if(sum > 1){
          hasConflict = true;
        }

        if(row + i > dimension - 1 || col + i > dimension - 1){
          return hasConflict;
        }

      }

      return hasConflict; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var hasConflict = false;
      var dimension = this.attributes.n;

      for(var i = -2; i < dimension; i++){
        hasConflict = this.hasMajorDiagonalConflictAt(i);
        if(hasConflict){
          return true;
        }
      }


      return hasConflict;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var hasConflict = false;
      var dimension = this.attributes.n;
      var sum = 0;
      // Setting the row equal to the input at column 3
      var col = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      
     // debugger;
      console.log('Minor', minorDiagonalColumnIndexAtFirstRow);
      
      // Check if the row is less than 0 or off the board
      if(col > 3 ) {
        //console.log('Row, col before calcs', row, col);
        
        // If yes, set row to 0
        row = col - 3;

        // Calculate the correct column
        col = 3;
        
        
        //console.log('Row, col after calcs', row, col);
      }


      for(var i = 0; i < dimension; i++){
        var incrementedRow = row + i;
        var decrementedCol = col - i;


        if(this.attributes[incrementedRow] === undefined || this.attributes[incrementedRow][col - 1] === undefined){
          return hasConflict;
        }
        // console.log('this.attributes[incrementedRow][col - i]', this.attributes[incrementedRow][decrementedCol]);
        // console.log('this.attributes[incrementedRow]', this.attributes[incrementedRow]);
        // console.log('Column', col);
        
        // Sum the coordinates along the minor diagonal 
        sum += this.attributes[incrementedRow][decrementedCol];
        //console.log('Logging sum', sum);

        // If the sum is greater than 1, there is a conflict
        if(sum > 1){
          hasConflict = true;
        }

        // If the row or column are off the board return conflict value
        if(incrementedRow > dimension - 1 || decrementedCol < 0){
          return hasConflict;
        }

      }

      return hasConflict; 
      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      this.hasMinorDiagonalConflictAt(5);
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
