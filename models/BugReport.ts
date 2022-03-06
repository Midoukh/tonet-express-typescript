import mongoose from "mongoose";

const BugReportSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "A report must have a number"],
    default: 1,
  },
  name: {
    type: String,
    required: [true, "A report must have a name"],
  },
  description: {
    type: String,
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const BugReport = mongoose.model("BugsReports", BugReportSchema);

export default BugReport;
