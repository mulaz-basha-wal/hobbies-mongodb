const { body, validationResult } = require("express-validator");
const Hobby = require("../models/hobbies");

function getHobbies(req, res) {
  // eslint-disable-next-line array-callback-return
  Hobby.find((error, hobby_list) => {
    if (error) {
      res.json(error);
    } else {
      res.json(hobby_list);
    }
  });
}

function dateFormatter(date) {
  let [day, month, year] = date.split("/");
  return new Date(`${month}/${day}/${year}`).toISOString();
}

const addHobby = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("name Min should be 5 and Max length to be 50"),
  body("desc")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("desc range is 10-100"),
  body("doc")
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("DOC must be a Date and its format is DD/MM/YYYY"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { name, desc, doc } = req.body;
      try {
        doc = new Date(dateFormatter(doc)).toISOString();
      } catch {
        res.json({
          message: "Date format is invaid. Correct format is dd/mm/yyyy",
        });
      }
      let hobbyObj = new Hobby({
        name,
        desc,
        doc,
      });
      hobbyObj.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: "Hobby added successfully" });
        }
      });
    }
  },
];

function deleteHobby(req, res) {
  const id = req.params.id;
  Hobby.findByIdAndDelete(id, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ status: `Hobby with _id ${id} is deleted` });
    }
  });
}
module.exports = {
  getHobbies,
  addHobby,
  deleteHobby,
};
