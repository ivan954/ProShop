import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error(
        "Error: MONGO_URI is not defined in environment variables".red.underline
          .bold
      );
      console.error(
        "Please set MONGO_URI in your deployment environment variables".yellow
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
