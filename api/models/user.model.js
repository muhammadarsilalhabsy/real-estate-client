import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Ghae4OEdb4UmC3hkqpFvLAHaGd%26pid%3DApi&f=1&ipt=ab295129c1e30cdbe5a675cd007b771d6e13fc63bad012f9ce245c471fa24dd6&ipo=images",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
