import pool from "../db/db.js";

const customerRecords = async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM customer_records`);
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the records " });
  }
};

export default customerRecords;
