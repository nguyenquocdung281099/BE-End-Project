const PromotionController = {
  CheckPromotion: (req, res) => {
    const { codePromotion } = req.body.requestData;
    Promotion.findOne({ code: codePromotion }, (err, docs) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: "err 404",
        });
      } else if (!docs) {
        res.status(404).json({
          success: false,
          message: "not have promotion",
        });
      } else {
        res.json({
          ...docs,
        });
      }
    });
  },
};

export default PromotionController;
