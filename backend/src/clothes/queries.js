const getClothes = "SELECT * FROM clothes";
const getClothesById = "SELECT * FROM clothes WHERE id = $1";
const addClothes =
  "INSERT INTO clothes (name,size,description,price) VALUES ($1,$2,$3,$4)";
const checkNameExists = "SELECT c FROM clothes c WHERE c.name = $1";
const removeClothe = "DELETE FROM clothes WHERE id = $1";
const updateClothe = "UPDATE clothes SET name = $2 WHERE id = $1";

module.exports = {
  getClothes,
  getClothesById,
  addClothes,
  checkNameExists,
  removeClothe,
  updateClothe,
};
