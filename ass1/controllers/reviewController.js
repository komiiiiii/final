const Review = require("../models/review");

// CREATE review
exports.createReview = async (req, res) => {
  try {
    const { movieId, reviewerName, comment, rating } = req.body;

    const review = await Review.create({
      movieId,
      userId: req.user.id,          
      reviewerName,
      comment,
      rating
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// READ all reviews
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate("movieId", "title");
  res.json(reviews);
};

// READ reviews by movie
exports.getReviewsByMovie = async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.movieId })
    .populate("movieId", "title");

  res.json(reviews);
};

// UPDATE review
exports.updateReview = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.comment !== undefined) {
      updateData.updatedComment = updateData.comment;
      delete updateData.comment;
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// DELETE review
exports.deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json({ message: "Review deleted successfully" });
};
