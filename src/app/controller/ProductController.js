import Product from "./model/product";

const ProductController = {
  getHotProduct: (req, res) => {
    Product.find({ tag: "hot" })
      .limit(6)
      .skip(6)
      .then((docs) => {
        res.json({
          data: docs,
          success: true,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "không tồn tại dữ liệu",
        });
      });
  },

  getProduct: (req, res) => {
    // const bodyRequest = req;
    console.log(req);
    const limit = 5;
    const page = 1;
    Product.find({})
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, products) => {
        Product.countDocuments((err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) {
            return res.status(404).json({
              success: false,
              message: "không tồn tại dữ liệu",
            });
          }
          res.json({
            data: products,
            success: true,
            meta: {
              page: page,
              limit: limit,
              total: Math.ceil(count / limit),
            },
          });
        });
      });
  },
};

export default ProductController;
