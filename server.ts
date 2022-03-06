import dotenv from "dotenv";
import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config({ path: "./config.env" });

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const DB: any = process.env.DB;
const options: ConnectionOptionsExtend & ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB, options).then(() => {
  console.log("Successfully connected to DB");
});

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`app runnig on port ${process.env.PORT || 5000}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED");
  server.close(() => {
    console.log("Process terminated");
  });
});
