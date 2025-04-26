exports.getHome = (req, res) => {
  const a = 3;
  let b = "Kết quả là";

  return res.send({
    message: a,
    b,
  });
};
