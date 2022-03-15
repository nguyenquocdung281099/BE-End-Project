import moment from "moment";
import Comment from "./model/Comment";

export default function ComponentRealTime(socketIo) {

  socketIo.on("connection", (socket) => {
    ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);

    socket.on("sendCommentFromClient", function (data) {
      const newComment = new Comment({
        ...data,
        createAt: moment(),
      });
      newComment.save();

      // Handle khi có sự kiện tên là sendDataClient từ phía client
      socketIo.emit("sendDataServer", { ...data, createAt: moment() }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
  });
}