import { connect } from "mongoose";

export const connectDb = async () => {
  try {

    await connect(process.env.DB_STRING);
    console.log("Database successfully connected");
  } catch (error) {
    console.log(`Dev Error : ${error}`);
  }
};
