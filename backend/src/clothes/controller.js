const pool = require("../../db");
const queries = require("./queries");

const getClothes = (req, res) => {
  pool.query(queries.getClothes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getClotheById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getClothesById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addClothe = (req, res) => {
  const { name, size, description, price } = req.body;
  // check name exists
  pool.query(queries.checkNameExists, [name], (error, results) => {
    if (results.rows.length) {
      res.send("Name already Exists");
    }
    // add clothes to database
    pool.query(
      queries.addClothes,
      [name, size, description, price],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Clothes Created Succesfully");
      }
    );
  });
};

const deleteClothe = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getClothesById, [id], (error, results) => {
    if (error) throw error;

    const noClothesFound = !results.rows.length;
    if (noClothesFound) {
      res.send("Clothes does not exists");
    }

    pool.query(queries.removeClothe, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Clothe Removed Succesfully");
    });
  });
};

const updateClothe = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getClothesById, [id], (error, results) => {
    const noClothesFound = !results.rows.length;

    if (noClothesFound) {
      res.send("Clothes does not exists");
    }

    pool.query(queries.updateClothe, [id, name], (error, results) => {
      if (error) throw error;
      res.status(200).send("Clothe changed Succesfully");
    });
  });
};

module.exports = {
  getClothes,
  getClotheById,
  addClothe,
  deleteClothe,
  updateClothe,
};
