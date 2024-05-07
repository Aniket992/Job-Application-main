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
      enum: ["open", "closed"],
      default: "open",
    },
    workType: {
      type: String,
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
    category:{
      type: String,
    },
    jobDescription: {
      type: String,
      required: [true, "Job Description is required"],
    },
    eligibility: { type: String, required: [true, "Eligibility is required"] },
    perks: { type: String, required: [true, "perks is required"] },
    skills:{type:String, required: [true, "skills is required"]},
    level:{type:String,required:[true,"level is required"]},
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

   
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
