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
        console.log('this.attributes[row + i][col + i]', this.attributes[row + i][col + i]);
        console.log('this.attributes[row + i]', this.attributes[row + i]);

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
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
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
