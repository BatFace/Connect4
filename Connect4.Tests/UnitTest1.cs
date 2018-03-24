using Connect4.Models;
using NUnit.Framework;

namespace Connect4.Tests
{
    [TestFixture]
    public class UnitTest1
    {
        private const bool Yellow = true;
        private const bool Red = false;

        [Test]
        public void CheckPlayingANewBoardIsNotAWin()
        {
            var game = new Game();


            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            board.MakeMove(game.Cells, 1, true);
            var actualResult = board.WasWinningMove(game.Cells, 1, true);
            Assert.IsFalse(actualResult);
        }

        [Test]
        public void CheckForWinningHorizontalMove()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            board.MakeMove(game.Cells, 1, true);
            board.MakeMove(game.Cells, 2, true);
            board.MakeMove(game.Cells, 4, true);

            board.MakeMove(game.Cells, 3, true);
            var actualResult = board.WasWinningMove(game.Cells, 3, true);
            Assert.IsTrue(actualResult);
        }

        [Test]
        public void CheckForWinningVerticalMove()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            board.MakeMove(game.Cells, 2, true);
            board.MakeMove(game.Cells, 2, true);
            board.MakeMove(game.Cells, 2, true);

            board.MakeMove(game.Cells, 2, true);
            var actualResult = board.WasWinningMove(game.Cells, 2, true);
            Assert.IsTrue(actualResult);
        }

        [Test]
        public void CheckForWinningDiagonalSEtoNW_Move()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            MakeNonWinningMove(game, 1, Red);
            MakeNonWinningMove(game, 1, Yellow);
            MakeNonWinningMove(game, 1, Red);
            MakeNonWinningMove(game, 1, Yellow);

            MakeNonWinningMove(game, 2, Yellow);
            MakeNonWinningMove(game, 2, Red);
            MakeNonWinningMove(game, 2, Yellow);

            MakeNonWinningMove(game, 3, Red);
            MakeNonWinningMove(game, 3, Yellow);

            board.MakeMove(game.Cells, 4, Yellow);
            var actualResult = board.WasWinningMove(game.Cells, 4, Yellow);
            Assert.IsTrue(actualResult);
        }


        [Test]
        public void CheckForWinningDiagonalSWtoNE_Move()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            MakeNonWinningMove(game, 4, Red);
            MakeNonWinningMove(game, 4, Yellow);
            MakeNonWinningMove(game, 4, Red);
            MakeNonWinningMove(game, 4, Yellow);

            MakeNonWinningMove(game, 3, Yellow);
            MakeNonWinningMove(game, 3, Red);
            MakeNonWinningMove(game, 3, Yellow);

            MakeNonWinningMove(game, 2, Red);
            MakeNonWinningMove(game, 2, Yellow);

            board.MakeMove(game.Cells, 1, Yellow);
            var actualResult = board.WasWinningMove(game.Cells, 1, Yellow);
            Assert.IsTrue(actualResult);
        }

        private static void MakeNonWinningMove(Game game, int columnNumber, bool isYellow)
        {
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            board.MakeMove(game.Cells, columnNumber, isYellow);
            Assert.IsFalse(board.WasWinningMove(game.Cells, columnNumber, isYellow));
        }

        [Test]
        public void CheckNewBoardIsNotFull()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);
            var actualResult = board.IsBoardFull(game.Cells);
            Assert.IsFalse(actualResult);
        }

        [Test]
        public void CheckFullyPlayedBoardIsFull()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);

            for (int c = 0; c < Game.NUMBER_OF_COLUMNS; c++)
            {
                for (int r = 0; r < Game.NUMBER_OF_ROWS; r++)
                {
                    board.MakeMove(game.Cells, c, true);
                }
            }

            var actualResult = board.IsBoardFull(game.Cells);
            Assert.IsTrue(actualResult);
        }

        [Test]
        public void CheckHeightOfEmptyColumnIs0()
        {
            var game = new Game();
            var board = new BoardAPI(10, 8);
            var actualResult = board.GetHeightOfColumn(game.Cells, 1);
            Assert.AreEqual(0, actualResult);
        }

        [Test]
        public void CheckHeightOfPlayedColumnIsCorrect()
        {
            var game = new Game();
            var board = new BoardAPI(10, 8);
            board.MakeMove(game.Cells, 1, true);
            board.MakeMove(game.Cells, 1, true);
            board.MakeMove(game.Cells, 1, true);

            var actualResult = board.GetHeightOfColumn(game.Cells, 1);
            Assert.AreEqual(3, actualResult);
        }


        [Test]
        public void TestMoveCannotBeMadeToInvalidNegativeColumn()
        {
            var game = new Game();
            var board = new BoardAPI(10, 8);

            var actualResult = board.IsMoveAllowed(game.Cells, -1);
            Assert.IsFalse(actualResult);
        }

        [Test]
        public void TestMoveCannotBeMadeToInvalidPostiveColumn()
        {
            var game = new Game();
            var board = new BoardAPI(Game.NUMBER_OF_COLUMNS, Game.NUMBER_OF_ROWS);

            //valid is 0...n-1
            var actualResult = board.IsMoveAllowed(game.Cells, Game.NUMBER_OF_COLUMNS);
            Assert.IsFalse(actualResult);
        }

        [Test]
        public void TestMoveCanBeMadeToValidColumn()
        {
            var game = new Game();
            var board = new BoardAPI(10, 8);

            var actualResult = board.IsMoveAllowed(game.Cells, 1) && board.IsMoveAllowed(game.Cells, Game.NUMBER_OF_COLUMNS - 1);
            Assert.IsTrue(actualResult);
        }
    }
}
