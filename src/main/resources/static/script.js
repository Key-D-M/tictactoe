document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const gameStatusDiv = document.getElementById("game-status");
  const newGameBtn = document.getElementById("new-game-btn");
  const API_BASE_URL = "/api/tictactoe";

  // Fungsi untuk memperbarui tampilan papan dan status game
  async function updateGameDisplay() {
    try {
      const response = await fetch(`${API_BASE_URL}/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const game = await response.json();

      // Perbarui sel-sel papan
      game.board.cells.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
          const cellElement = document.querySelector(
            `.cell[data-row="${rowIndex}"][data-col="${colIndex}"]`
          );
          cellElement.textContent = cellValue || ""; // Kosongkan jika null
          cellElement.className = "cell"; // Reset kelas CSS
          if (cellValue) {
            cellElement.classList.add(cellValue); // Tambahkan kelas X atau O
          }
        });
      });

      // Perbarui status game
      if (game.gameOver) {
        if (game.winner === "DRAW") {
          gameStatusDiv.textContent = "Game Seri!";
        } else {
          gameStatusDiv.textContent = `Pemenang: ${game.winner}!`;
        }
        disableCells();
      } else {
        gameStatusDiv.textContent = `Giliran: ${game.currentPlayer}`;
        enableCells(game.board.cells); // Aktifkan sel yang kosong
      }
    } catch (error) {
      console.error("Error fetching game status:", error);
      gameStatusDiv.textContent = "Gagal memuat status game.";
    }
  }

  // Fungsi untuk mengirim gerakan ke server
  async function makeMove(row, col) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/move?row=${row}&col=${col}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await updateGameDisplay(); // Perbarui tampilan setelah gerakan
    } catch (error) {
      console.error("Error making move:", error);
      gameStatusDiv.textContent = "Gagal melakukan gerakan.";
    }
  }

  // Fungsi untuk memulai game baru
  async function startNewGame() {
    try {
      const response = await fetch(`${API_BASE_URL}/new-game`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await updateGameDisplay(); // Perbarui tampilan untuk game baru
    } catch (error) {
      console.error("Error starting new game:", error);
      gameStatusDiv.textContent = "Gagal memulai game baru.";
    }
  }

  // Menonaktifkan semua sel
  function disableCells() {
    cells.forEach((cell) => {
      cell.style.pointerEvents = "none"; // Nonaktifkan klik
    });
  }

  // Mengaktifkan hanya sel yang kosong
  function enableCells(boardCells) {
    cells.forEach((cell) => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (boardCells[row][col] === null) {
        cell.style.pointerEvents = "auto"; // Aktifkan klik
      } else {
        cell.style.pointerEvents = "none"; // Nonaktifkan klik untuk sel yang sudah terisi
      }
    });
  }

  // Event listener untuk klik sel
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      makeMove(row, col);
    });
  });

  // Event listener untuk tombol game baru
  newGameBtn.addEventListener("click", startNewGame);

  // Inisialisasi tampilan saat halaman dimuat
  updateGameDisplay();
});
