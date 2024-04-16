import mongoose from "mongoose";

// Define Application Schema
const applicationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: String, required: true },
    education: { type: String, required: true },
    resume:  {type:String,required:true} // URL to the uploaded resume
  },
  { timestamps: true }
);

// Create Application model
export default mongoose.model("application", applicationSchema);
