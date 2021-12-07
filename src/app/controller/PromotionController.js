import moment from "moment";
import Promotion from "./model/Promotion";

const PromotionController = {
  CheckPromotion: (req, res) => {
    const { codePromotion } = req.body.requestData;
    Promotion.findOne({ code: codePromotion }, (err, docs) => {
      console.log(docs);
      if (docs && moment(new Date(docs.expiryDate)) > moment() && docs.amount > 0) {
        return res.json({
          data: { code: docs.code, discount: docs.discount, id: docs._id, name: docs.name },
          success: true,
        });
      } else {
        return res.sendStatus(404);
      }
    });
  },
};

export default PromotionController;
