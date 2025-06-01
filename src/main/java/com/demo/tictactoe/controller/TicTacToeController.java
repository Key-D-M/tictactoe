package com.demo.tictactoe.controller;

import com.demo.tictactoe.model.Game;
import org.springframework.web.bind.annotation.*;

@RestController // Menandakan kelas ini sebagai REST Controller
@RequestMapping("/api/tictactoe") // Base URL untuk semua endpoint di controller ini
public class TicTacToeController {

    private Game game = new Game(); // Instansi game tunggal

    @GetMapping("/status")
    public Game getGameStatus() {
        return game;
    }

    @PostMapping("/move")
    public Game makeMove(@RequestParam int row, @RequestParam int col) {
        game.makeMove(row, col);
        return game;
    }

    @PostMapping("/new-game")
    public Game startNewGame() {
        game.newGame();
        return game;
    }
}