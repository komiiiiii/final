const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const movieController = require("../controllers/movieController");

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

router.post("/", auth, requireRole("admin"), movieController.createMovie);
router.put("/:id", auth, requireRole("admin"), movieController.updateMovie);
router.delete("/:id", auth, requireRole("admin"), movieController.deleteMovie);

module.exports = router;
