import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  emoji: {
    type: String,
    required: [true, "A review must have an emoji"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
