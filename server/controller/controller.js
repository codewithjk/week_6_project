const userDB = require("../model/model");

exports.create = (req, res) => {
  //new user
  const user = new userDB({
    name: req.body.name,
  });
  //save user in database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error in ctreating user",
      });
    });
};
//find all data
exports.find = (req, res) => {
  userDB
    .find({ name: "max" })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};
