exports.getHome = function (req, res) {
    var a = 3;
    var b = "Kết quả là";
    return res.send({
        message: a,
        b: b
    });
};
