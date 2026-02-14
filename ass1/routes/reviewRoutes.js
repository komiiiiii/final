const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

const auth = require("../middleware/authMiddleware");
const adminReviewMiddleware = require("../middleware/adminReviewMiddleware");

// Public
router.get("/", reviewController.getAllReviews);
router.get("/movie/:movieId", reviewController.getReviewsByMovie);

// Any logged-in user can create review
router.post("/", auth, reviewController.createReview);

// Only owner OR admin can update/delete
router.put("/:id", auth, adminReviewMiddleware, reviewController.updateReview);
router.delete("/:id", auth, adminReviewMiddleware, reviewController.deleteReview);

module.exports = router;
