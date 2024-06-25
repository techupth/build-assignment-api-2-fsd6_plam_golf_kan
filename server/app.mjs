import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4001;
app.use(express.json())

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.delete("/assignments/:assignmentId", async(req, res)=>{
  const assignmentIdFromClient = req.params.assignmentId;

  try
  {
    await connectionPool.query(
    `delete from assignments
     where assignment_id = $1`,
     [assignmentIdFromClient]
  );
}catch {
  return res.status(500).json({
    message: "Server could not delete assignment because database connection"
  });
}

  return res.status(200).json({
    message: "Deleted assignment sucessfully"
  });
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
