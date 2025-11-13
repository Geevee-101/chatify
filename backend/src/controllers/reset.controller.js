import Message from "../models/Message.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createUser } from "../lib/userService.js";
import cloudinary from "../lib/cloudinary.js";

const defaultUsers = [
  {
    name: "Shinji",
    email: "shinji@nerv.com",
    password: "123456",
  },
  {
    name: "Rei",
    email: "rei@nerv.com",
    password: "123456",
  },
  {
    name: "Asuka",
    email: "asuka@nerv.com",
    password: "123456",
  },
];

const shinjiToReiMessages = [
  "Hi Rei",
  "Yeah, I'm okay I guess. Have you been reading the books I recommended?",
  "So what do you think?",
]

const reiToShinjiMessages = [
  "Hello Shinji. Are you doing well?",
  "Yes.",
  "It's okay. Can you please pass me the photo of the mountains?",
]

const asukaToShinjiMessages = [
  "Shinji!",
  "Anta baka?!",
  "Next time you cook for me, okay?!",
]

const shinjiToAsukaMessages = [
  "Oh hi Asuka",
  "Huh? What did I do?",
  "Yeah, okay"
]

export const resetDatabase = async (req, res) => {
  try {
    // Delete everything first
    Message.deleteMany({})
      .then(() => {
        console.log("All messages deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting messages:", err);
      });

    User.deleteMany({})
      .then(() => {
        console.log("All users deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting users:", err);
      });

    // Create default users
    await Promise.all(
      defaultUsers.map(async (userData) => {
        await createUser(userData.name, userData.email, userData.password);
        console.log(`Created user: ${userData.name}`);
      })
    );

    // Collect default users with name and id
    const defaultUsersData = await User.find({
      email: { $in: defaultUsers.map((user) => user.email) },
    }).select("_id name email");

    const { shinjiAvatar, reiAvatar, asukaAvatar } = req.body;

    // Upload avatars to Cloudinary and update users
    const shinjiUser = defaultUsersData.find(user => user.name === "Shinji");
    const reiUser = defaultUsersData.find(user => user.name === "Rei");
    const asukaUser = defaultUsersData.find(user => user.name === "Asuka");

    if (shinjiAvatar) {
      const uploadResponse = await cloudinary.uploader.upload(shinjiAvatar);
      await User.findByIdAndUpdate(shinjiUser._id, { profilePic: uploadResponse.secure_url });
    }

    if (reiAvatar) {
      const uploadResponse = await cloudinary.uploader.upload(reiAvatar);
      await User.findByIdAndUpdate(reiUser._id, { profilePic: uploadResponse.secure_url });
    }

    if (asukaAvatar) {
      const uploadResponse = await cloudinary.uploader.upload(asukaAvatar);
      await User.findByIdAndUpdate(asukaUser._id, { profilePic: uploadResponse.secure_url });
    }

    const shinjiId = shinjiUser._id;
    const reiId = reiUser._id;
    const asukaId = asukaUser._id;
    
    // Create conversation between Shinji and Rei
    for (let i = 0; i < shinjiToReiMessages.length; i++) {
      const newShinjiMessage = new Message({
        senderId: shinjiId,
        receiverId: reiId,
        text: shinjiToReiMessages[i],
      });
      await newShinjiMessage.save();

      const newReiMessage = new Message({
        senderId: reiId,
        receiverId: shinjiId,
        text: reiToShinjiMessages[i],
      });
      await newReiMessage.save();
    }

    const newShinjiImageMessage = new Message({
      senderId: shinjiId,
      receiverId: reiId,
      text: "Here it is!",
      image: shinjiAvatar,
    });
    await newShinjiImageMessage.save();


    // Create conversation between Asuka and Shinji
    for (let i = 0; i < asukaToShinjiMessages.length; i++) {
      const newAsukaMessage = new Message({
        senderId: asukaId,
        receiverId: shinjiId,
        text: asukaToShinjiMessages[i],
      });
      await newAsukaMessage.save();

      const newShinjiMessage = new Message({
        senderId: shinjiId,
        receiverId: asukaId,
        text: shinjiToAsukaMessages[i],
      });
      await newShinjiMessage.save();
    }

    res.status(200).json({ message: "Database reset successfull" });

  } catch (error) {
    console.log("Error in resetDatabase:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
