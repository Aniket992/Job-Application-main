import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    logo:{
      type:String
    },
    company: {
      type: String,
      requied: [true, "Companay name is require"],
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["open", "closed", "interviewing"],
      default: "open",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Pan-India",
      required: [true, "Work location is required"],
    },
    salary: {
      type: String,
      // required: [true, "Work location is required"],
    },
    Category:{
      type: String,
    },
    JobDescription: {
      type: String,
      required: [true, "Job Description is required"],
    },
    Eligibility: { type: String, required: [true, "Eligibility is required"] },
    perks: { type: String, required: [true, "perks is required"] },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

   
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
