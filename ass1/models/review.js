const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reviewerName: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    updatedComment: { 
        type: String, 
        default: "" 
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
