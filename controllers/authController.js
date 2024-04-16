import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res, next) => {
  const { userType, name, lastName, email, password } = req.body;

  try {
    if (!userType || !name || !lastName || !email || !password) {
      return next(new Error("Please Provide All Fields"));
    }

   
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new Error("Email already registered. Please login."));
    }
    if (!password || password.length < 6) {
      return next(
        new Error(
          "Password is required and should be at least 6 characters long"
        )
      );
    }
    const user = await userModel.create({
      userType,
      name,
      lastName,
      email,
      password,
    });
    //token
    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        userType: user.userType,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    return next(new Error("Please Provide All Fields"));
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new Error("Invalid email or password"));
    }

    if (user.isDeleted) {
      return next(new Error("Account not found"));
    }

    const isMatch = await user.comparePassword(password);

    // Check if password matches
    if (!isMatch) {
      return next(new Error("Invalid email or password"));
    }

    user.password = undefined;
    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    next(error); // Pass error to the error middleware
  }
};
