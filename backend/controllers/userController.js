import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";
config();
import cloudinary from "../utils/cloudinary.js";

export async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.json({ success: false, message: "All fields are Required" });
    }
    const user = await User.findOne({ email }); //it return user object if found return null if not found

    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, 10), //that much time password will be hashed (changed)
    }); //it return saved document--> create method create the document and save inside the database

    //creating the token and passing the token and email to verfy the email
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    }); //it will generate token jwt.sign(payload, secretKey, options)
    // console.log("Token:",token);  //divided into 3 part header(algo info),payload(user data),signature

    newUser.token = token; //saves the particular user token inside database
    await newUser.save(); //saved db after changes

    verifyEmail(token, email); //verify email

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });      
  } catch (error) {
    //try
    return res.status(500).json({ success: false, message: error.message });
  } //catch
} //after registration email will be sent to the registered email to verify the mail

export async function verify(req, res) {
  try {
    const authHeader = req.headers.authorization; //it will contain Bearer and token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or Invalid",
      }); //bad request
    } //if

    const token = authHeader.split(" ")[1]; //[Bearer token] token recieved from the frontEnd
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Decoded token", decoded);
    } catch (err) {
      //inner try

      if (err.name == "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The Registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token Verification failed..",
      });
    } //inner catch

    const user = await User.findOne({ _id: decoded.id }); //finding user from id to make changes inside the user document in database (changes token field and isVerified field)
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email Verfied Successfully..",
      user: user,
    });
  } catch (error) {
    //outer try
    res.status(500).json({ success: false, message: error.message });
  } //catch
} //after user registration the user get an verfication link on registered email ---> after clicking the verify link email will be verified  (isVerfied=true)
//we are verifying the email beacuse we need real user who has valid email otherwise anyone Can register with invalid email(prevent fake account)

export async function reVerify(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }); //if entered user is not registered then user will not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is Not found...",
      });
    }

    let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "20m",
    });
    verifyEmail(token, email);
    user.token = token; //before reverification token was null
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification Email sent again Successfully..",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //after user registration the verfy email is sent to the user email -->after clicking verify email if user is not verified  then it may be token will get expired .for that we have to  reVerfy the email by entering the particular email on frontend

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required.." });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exists Or Enter Correct Email",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials Or Password does not Match",
      });
    }

    if (existingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Please verify the Email First And Then Login",
      });
    } //if we are login without registration or verifying the email then

    //generate token
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" },
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );

    existingUser.isLoggedIn = true; //logged In
    await existingUser.save();   

    //check for existing session and delete it from Session Model
    const existingSession = await Session.findOne({ userId: existingUser._id }); //finding the existing session
    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id }); //deleting existing session
    }  
   
    //create new Session
    await Session.create({ userId: existingUser._id }); //creationg the session doc in session Model in Db

    return res.status(200).json({
      success: true,
      message: `Welcome back ${existingUser.firstName}`,
      user: existingUser,
      accessToken,
      refreshToken,
    }); //response after login
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //update the isLoggedIn=true

export async function logout(req, res) {
  console.log(
    "While Authentication req will set with userId and User and (Printing in Logout Controller)",
    req.user,
  );
  try {
    const userId = req.id; //while authentication we have put in req
    await Session.deleteMany({ userId: userId }); //deleted session document of this userID
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res
      .status(200)
      .json({ success: true, message: "User Logged out Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //update the isLoggedIn=false

export async function forgetPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);//for 10  min

    //changing inside the dtabase
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sendOTPMail(otp, email); 

    return res
      .status(200)
      .json({ success: false, message: "Otp sent to email sucessfully..." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //from this functionality otp will be sent to particular user mail, user.otp=otp,  user.otpVerify=otpVerify

export async function verifyOTP(req, res) {
  try {
    const { otp } = req.body;
    const email = req.params.email;

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ sucess: false, message: "User Not Found" });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "otp is not generated or already verified",
      }); //if otp and otpExpiry is not in database then this will happen
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        sucess: false,
        message: "OTP has Expired Please request a new One ",
      });
    } //new Date() return Date and Time

    if (user.otp != otp) {
      return res.status(400).json({ sucess: false, message: "OTP is invalid" });
    } //when entered otp !== sent otp on mail then this error

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Otp verified successfully.." });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
} //comparing otp from database  with user typed otp user.otp==otp

export async function changePassword(req, res) {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;
    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const hashedPasword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPasword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password Changed Successfully.." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function alluser(req, res) {
  try {
    const users = await User.find();
    if (!users) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //can access only by admin

export async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      -otp - otpExpiry - token - password,
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const userIdToUpdate = req.params.id;
    const loggedInUser = req.user;

    const {
      firstName,
      lastName,
      address,
      city,
      zipCode,
      phoneNo,
    } = req.body;

    // Authorization check
    if (
      loggedInUser._id.toString() !== userIdToUpdate &&
      loggedInUser.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }

    // Find user
    const user = await User.findById(userIdToUpdate);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Existing profile picture
    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;

    // New profile picture
    if (req.file) {
      // Delete old image
      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId);
      }

      // Upload new image
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profiles",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      profilePicUrl = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id;
    }

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phoneNo = phoneNo || user.phoneNo;

    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//Notes 1) register means we have to put the required credentials of particular user inside the db to register the user -->for that i have to create user inside the db-->before that i have to check is that user already exist
//2  401 → Not authenticated (login required) 403 → Authenticated but not allowed
