package com.demo.tictactoe.model;

public class Game {
    private Board board;
    private String currentPlayer; // "X" atau "O"
    private String winner; // "X", "O", "DRAW", atau null
    private boolean gameOver;

    public Game() {
        newGame();
    }

    public void newGame() {
        this.board = new Board();
        this.currentPlayer = "X"; // X memulai
        this.winner = null;
        this.gameOver = false;
    }

    public Board getBoard() {
        return board;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public String getWinner() {
        return winner;
    }

    public boolean isGameOver() {
        return gameOver;
    }

    // Metode untuk melakukan gerakan
    public boolean makeMove(int row, int col) {
        if (gameOver || !board.isEmpty(row, col)) {
            return false; // Game sudah berakhir atau sel sudah terisi
        }

        board.placeMark(row, col, currentPlayer);

        String currentWinner = board.checkWinner();
        if (currentWinner != null) {
            this.winner = currentWinner;
            this.gameOver = true;
        } else if (board.isFull()) {
            this.winner = "DRAW";
            this.gameOver = true;
        } else {
            // Ganti giliran pemain
            currentPlayer = (currentPlayer.equals("X")) ? "O" : "X";
        }
        return true;
    }
}