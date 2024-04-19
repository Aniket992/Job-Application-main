import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  { jobId:{type: String, required: true},
    userId:{ type: String, required: true},
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: String, required: true },
    education: { type: String, required: true },
    resume:  {type:String,required:true},
    status: {type:String,
    default:"applied"},
  },
  { timestamps: true }
);

export default mongoose.model("application", applicationSchema);
