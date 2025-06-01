package com.demo.tictactoe.model;

import java.util.Arrays;

public class Board {
    private String[][] cells; // Array 3x3 untuk papan: "X", "O", atau null
    private static final int SIZE = 3;

    public Board() {
        cells = new String[SIZE][SIZE];
        for (String[] row : cells) {
            Arrays.fill(row, null); // Inisialisasi semua sel dengan null
        }
    }

    public String[][] getCells() {
        return cells;
    }

    public boolean isEmpty(int row, int col) {
        return cells[row][col] == null;
    }

    public void placeMark(int row, int col, String playerMark) {
        cells[row][col] = playerMark;
    }

    public boolean isFull() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (cells[i][j] == null) {
                    return false;
                }
            }
        }
        return true;
    }

    // Metode untuk memeriksa pemenang
    public String checkWinner() {
        // Cek baris
        for (int i = 0; i < SIZE; i++) {
            if (cells[i][0] != null && cells[i][0].equals(cells[i][1]) && cells[i][1].equals(cells[i][2])) {
                return cells[i][0];
            }
        }

        // Cek kolom
        for (int j = 0; j < SIZE; j++) {
            if (cells[0][j] != null && cells[0][j].equals(cells[1][j]) && cells[1][j].equals(cells[2][j])) {
                return cells[0][j];
            }
        }

        // Cek diagonal
        if (cells[0][0] != null && cells[0][0].equals(cells[1][1]) && cells[1][1].equals(cells[2][2])) {
            return cells[0][0];
        }
        if (cells[0][2] != null && cells[0][2].equals(cells[1][1]) && cells[1][1].equals(cells[2][0])) {
            return cells[0][2];
        }

        return null; // Tidak ada pemenang
    }
}