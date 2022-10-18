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
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
