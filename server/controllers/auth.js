import User from "../models/User.js";
import { token } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { validBody } from "../utils/validBody.js";
import { loginSchema, registerSchema } from "../validations/auth.js";

export const userExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(200).json({
        exists: false,
      });
    }
    return res.status(200).json({
      exists: true,
      error: "Email already exists",
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if email is already in use
     * 3. Hash password
     * 4. Create user - save to database
     */
    const { email, password, name, dob, gender } = req.body;

    const errors = validBody(req.body, registerSchema);
    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    // 3. Hash password
    const hashPasswordUser = await hashPassword(password);

    // 4. Create user - save to database

    // Cach 1:
    const user = await User.create({
      email: email,
      password: hashPasswordUser,
      name: name,
      dob: dob,
      gender: gender,
    });

    // Cach 2:
    // const user = new User({ email, password: hashPassword });
    // await user.save();

    user.password = undefined;
    return res.status(201).json({
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// export const register = async (req, res, next) => {
//   try {
//     /**
//      * 1. Validate request body
//      * 2. Check if email is already in use
//      * 3. Hash password
//      * 4. Create user - save to database
//      */
//     const { email, password } = req.body;

//     const errors = validBody(req.body, registerSchema);
//     if (errors) {
//       return res.status(400).json({
//         message: "Validation errors",
//         errors,
//       });
//     }

//     // 2. Check if email is already in use
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({
//         message: "Email is already in use",
//       });
//     }

//     // 3. Hash password
//     const hashPasswordUser = await hashPassword(password);

//     // 4. Create user - save to database

//     // Cach 1:
//     const user = await User.create({
//       email,
//       password: hashPasswordUser,
//     });

//     // Cach 2:
//     // const user = new User({ email, password: hashPassword });
//     // await user.save();

//     user.password = undefined;
//     return res.status(201).json({
//       message: "Register successfully",
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const login = async (req, res, next) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if email exists
     * 3. Compare password
     * 4. Generate token
     * 5. Response token, user info
     */

    const { email, password } = req.body;
    const errors = validBody(req.body, loginSchema);
    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    // 2. Check user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        message: "Email is not found",
      });
    }

    // 3. Compare password
    const checkPassword = await comparePassword(password, userExist.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    // 4. Generate token
    const accessToken = token({ _id: userExist._id }, "1h"); // access token 1 hour
    const refreshToken = token({ _id: userExist._id }, "1d"); // refresh token 1 day

    userExist.refreshToken = refreshToken;
    await userExist.save();

    // 5. Response token, user info
    userExist.password = undefined;

    return res.status(200).json({
      message: "Login successfully!",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
