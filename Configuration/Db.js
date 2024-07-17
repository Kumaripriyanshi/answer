import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);

    console.log(`Conneted To Mongodb Databse ${conn.connection.host}`);
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDatabase;
