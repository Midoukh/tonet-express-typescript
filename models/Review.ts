import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  reaction: {
    type: String,
    required: [true, "A review must have an emoji"],
    enum: ["Aweful", "Bad", "Ok Ok", "Good", "Amazing"],
  },
  ipAdress: {
    type: String,
    required: [true, "A review must have an ipAdress"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
