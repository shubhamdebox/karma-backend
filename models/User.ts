import mongoose from "mongoose";
const { Schema } = mongoose;

//House schema declaration
const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  rooms : {
    type: [String],
    default: [],
  }
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
