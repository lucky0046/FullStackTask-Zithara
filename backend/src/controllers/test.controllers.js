const testRoute = async (req, res) => {
  try {
    res.status(200).json({ message: "Api is Working !!!!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { testRoute };
