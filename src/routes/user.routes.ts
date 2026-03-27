import { Router } from "express";

const router = Router();

// This handles GET http://localhost:8000/api/users
router.get("/", (req, res) => {
  res.json({ message: "List of users fetched successfully" });
});

// This handles POST http://localhost:8000/api/users
router.post("/", (req, res) => {
  res.json({ message: "User created" });
});

export default router;