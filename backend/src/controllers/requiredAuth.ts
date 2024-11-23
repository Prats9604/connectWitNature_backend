import express from 'express'
const jwt = require("jsonwebtoken");

const requireAuth = (req:any, res:any) => {
  const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, "secret");

      res.json({
        auth: true,
        data: decode,
      });
    } catch (error:any) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
};

exports.requireAuth = requireAuth;