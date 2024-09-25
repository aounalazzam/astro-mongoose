import mongoose from "mongoose";
import type { AstroIntegration } from "astro";

const closeConnection = async () => {
  await mongoose.connection.close();
  console.info("MongoDB connection closed");
  process.exit(0);
};

const mongooseIntegration = (
  uri: string,
  options?: mongoose.ConnectOptions
): AstroIntegration => {
  let isConnectionStarted = false;

  if (!uri) {
    throw new Error(
      "MongoDB URI is required. Set it in the options or as an environment variable MONGODB_URI."
    );
  }

  return {
    name: "astro-plugin-mongoose",
    hooks: {
      "astro:server:start": async () => {
        if (isConnectionStarted) {
          return console.info(`MongoDB Connected @ ${uri}`);
        }
        try {
          await mongoose.connect(uri, options);
          console.info(`MongoDB Connect @ ${uri}`);
          isConnectionStarted = true;
        } catch (error) {
          console.error(`MongoDB connection error: ${error}`);
          process.exit(1);
        }
      },
      "astro:server:stop": async () => {
        if (!isConnectionStarted) {
          return;
        }

        try {
          await mongoose.connection.close();
          console.debug("MongoDB Connection closed gracefully");
        } catch (error) {
          console.error("Error closing MongoDB connection:", error);
        }
      },
    },
  };
};

export default mongooseIntegration;
