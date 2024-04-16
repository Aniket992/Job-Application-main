import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {userType:{
    type:String,
    required:[true,"userType is require"]
  },
    name: {
      type: String,
      required: [true, "Name Is Require"],
    },
    lastName: {
      type: String,
      required: [true, "Name Is Require"],
    },
    email: {
      type: String,
      required: [true, " Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
    education: [
      {
      level: { type: String },
      institute: { type: String },
      percentage: { type: Number },
      year: { type: Number },
    }
    ],

    experience: [
      {
        position: { type: String },
        company: { type: String },
        duration:{type:Number},
        year: { type: Number },
      },
     
    ],
    skills:[
        {type:String}
    ],
    resume: {
      data: Buffer, // Binary data of the PDF file
      contentType: String, // MIME type of the file (e.g., application/pdf)
      filename: String, // Original filename
    },
    links: {
      portfolio: { type: String },
      linkedinProfile: { type: String },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isProfileComplete:{
      type:Boolean,
      default: false,
    }
  },

  { timestamps: true }
);
// middelwares
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export default mongoose.model("User", userSchema);
