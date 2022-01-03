import Comment from "./model/Comment";

const CommentController = {
  getComment: (req, res) => {
    const query = req.query;
    const idRoom = query.id;
    const limit = parseInt(query.limit) || 5;
    const page = parseInt(query.page) || 1;
    Comment.find({ idRoom: idRoom })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate("idUser")
      .exec((err, comment) => {
        Comment.count({ idRoom: idRoom }).exec((err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) {
            return res.status(404).json({
              success: false,
              message: "không tồn tại dữ liệu",
            });
          }
          res.json({
            data: comment,
            success: true,
            meta: {
              page: page,
              limit: limit,
              total: count,
            },
          });
        });
      });
  },
  createComment: (req, res) => {
    const requestData = req.body.requestData;
    const newComment = new Comment({
      ...requestData,
    });
    newComment.save((err, docs) => console.log({ err, docs }));
    res.json({
      success: true,
      message: "đăng kí tài khoản thành công",
    });
  },
};
export default CommentController;
