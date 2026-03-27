import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger";
import userRoutes from "./routes/user.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route - Fixes the "Cannot GET /" error
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    documentation: "/api-docs",
    endpoints: {
      users: "/api/users"
    }
  });
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/users", userRoutes);

export default app;