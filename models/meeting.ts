import mongoose from "mongoose";
const { Schema } = mongoose;

//House schema declaration
const MeetingSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  phoneNo:{
    type: Number,
    require: true,
  },
  Date:{
    type:String
  }
  
});

const MeetingModel = mongoose.model("Meeting", MeetingSchema);
export default MeetingModel;
