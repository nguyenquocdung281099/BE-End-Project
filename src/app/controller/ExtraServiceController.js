import ExtraService from "./model/ExtraService";

const ExtraServiceController = {
  getExtraService: (req, res) => {
    ExtraService.find({}, (err, service) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
          data: service,
        });
      }
    });
  },
};

export default ExtraServiceController;
