const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const router = express.Router();
router.get(
  "/hello",
  celebrate({
    [Segments.QUERY]: {
      param: Joi.string().required(),
    },
  }),
  (req, res) => {
    res.send("Hello World!");
  }
);

module.exports = router;
