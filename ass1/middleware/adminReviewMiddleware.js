const Review = require("../models/review");

module.exports = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = review.userId.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Forbidden: not your review" });
    }

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
