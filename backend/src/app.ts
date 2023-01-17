import express from "express";
import sql from "./db";
const app = express();
const router = express.Router();

app.use(express.json());

router.post("/example", async (req, res) => {
  const response = await sql("SELECT * FROM users WHERE id = ?", Number(req.body.id) || 9);
  const favorite = response[0];
  console.log(favorite)
  return res.json({ favorite });
});


router.get("/workorders", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const response = await sql("SELECT * FROM work_orders");
  const workorder_list = response;
  console.log(workorder_list)
  return res.json({ workorder_list });
});

router.get("/workorders/:id", async (req, res) => {
  // const sql_query = "SELECT " +
  //     "work_orders.name AS work_order_name,  " +
  //     "work_orders.status, " +
  //     "work_orders.id AS work_order_id, " +
  //     "work_order_assignees.user_id, " +
  //     "users.name AS user_name, " +
  //     "users.email as user_email " +
  //     //   "(" +
  //     //     "SELECT " +
  //     //     "users.id AS user_id, " +
  //     //     "users.email AS user_email, " +
  //     //     "users.name AS user_name " +
  //     //     "FROM users" +
  //     //     // "WHERE users.id IN work_order_assignees.user_id" +
  //     // ") AS assignees " +
  //     "FROM work_orders " +
  //     "INNER JOIN work_order_assignees " +
  //     "ON work_orders.id = work_order_assignees.work_order_id " +
  //     "INNER JOIN users " +
  //     "ON users.id = work_order_assignees.user_id " +
  //     "WHERE work_orders.id = ?"

  const sql_query =
          "SELECT " +
          "users.id, " +
          "users.email, " +
          "users.name " +
          "FROM users " +
          "INNER JOIN work_order_assignees " +
          "ON users.id = work_order_assignees.user_id " +
          "WHERE work_order_assignees.work_order_id = ?"
  const response = await sql(sql_query, Number(req.params.id));
  const assignees = response === [] ? [] : response;
  const sql_query_2 = "SELECT " +
      "work_orders.name,  " +
      "work_orders.status, " +
      "work_orders.id " +
      "FROM work_orders " +
      "WHERE work_orders.id = ? "
  const response_2 = await sql(sql_query_2, Number(req.params.id));

  const body = response_2[0];
  body.assignees = assignees;

  return res.json({ work_order : body});
});

router.get("/productivity", async (req, res) => {
  const sql_query = "SELECT * " +
      "FROM users " +
      "WHERE id NOT IN (SELECT user_id FROM work_order_assignees);"
  const response = await sql(sql_query);
  const favorite = response;
  console.log(favorite)
  return res.json({ favorite });
});

router.get("/users", async (req, res) => {
  const sql_query = "SELECT * " +
      "FROM users);"
  const response = await sql(sql_query);
  const users = response;
  console.log(users)
  return res.json({ users });
});

router.put("/workorders/:id", async (req, res) => {
  const work_order = req.body;
  console.log(work_order);
  const sql_query = "UPDATE work_orders " +
      "SET status = ?" +
      "WHERE id = ?;"

  try {
    const response = await sql(sql_query, work_order.status,  Number(req.params.id));
    return res.json();
  }catch (e){
    res.status(400);
    res.json({"error" : "something went wrong"});
  }

});

app.use("/api", router);

app.listen(4000);
