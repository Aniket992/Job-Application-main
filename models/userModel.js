import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: [true, "userType is require"],
    },
    name: {
      type: String,
      required: [true, "Name Is Require"],
    },
    lastName: {
      type: String,
      required: [true, "Name Is Require"],
    },
    companyName:{
      type: String,
      default: "enter CompanyName",


    },
    companyLogo:{
      type: String,
      default: "logo",

    },
    text:{
      type: String,
      default: "text  admires you",

    },
    about:{
      type: String,
      default: "text describes you and your work contribution",

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
    education: [ {
      level: { type: String, default: "" },
      institute: { type: String, default: "" },
      percentage: { type: String, default: "" },
      year: { type: String, default: "" }
    }],
    experience: [
      {
        position: {
          type: String,
          required: [true, "Position is required"],
        },
        company: {
          type: String,
          required: [true, "Company is required"],
        },
        duration: {
          type: String,
          required: [true, "Duration is required"],
        },
        startingYear: {
          type: String,
          required: [true, "Starting year is required"],
        },
      }
    ],
    
    skills: [{ type: String }],
    
    resume:  {type:String},

    links: {
      portfolio: { type: String },
      linkedinProfile: { type: String },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
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
