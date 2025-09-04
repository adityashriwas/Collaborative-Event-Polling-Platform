import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Error: ", error);
  }
};

export default connectDB;
