import express from "express";

const router = express.Router();

router.post("/data", (req, res) => {
  res.send(req.body);
});

export default router;
