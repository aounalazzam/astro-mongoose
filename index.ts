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
  if (!uri) {
    throw new Error(
      "MongoDB URI is required. Set it in the options or as an environment variable MONGODB_URI."
    );
  }

  return {
    name: "astro-plugin-mongoose",
    hooks: {
      "astro:server:start": async () => {
        try {
          await mongoose.connect(uri, options);
          console.info(`MongoDB Connected @ ${uri}`);
        } catch (error) {
          console.error(`MongoDB connection error: ${error}`);
          process.exit(1);
        }

        process.on("SIGINT", closeConnection);
      },
      "astro:server:stop": async () => {
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
