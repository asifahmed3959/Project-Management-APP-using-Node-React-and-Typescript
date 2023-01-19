import express from "express";
import db from "../db";

const router = express.Router();
let ts = Date.now();

// returns the list of workoders by doing a simple query
router.get("/workorders", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    await db.all("SELECT * FROM work_orders", (error: any, row: any) => {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if (error !== null) {
            console.log("db error: ", error);
            return res.json({ error : error });
        }

        console.log("Status code: " + 200);
        return res.json({ workorder_list : row });
    });
});


// get a single work order by detail
// I wanted to assignee along with it
// but realized it would an overloading
// therefore created another api
// to get the assignees
router.get("/workorders/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sql_query = "SELECT " +
        "work_orders.name,  " +
        "work_orders.status, " +
        "work_orders.id " +
        "FROM work_orders " +
        "WHERE work_orders.id = ? "

    await db.get(sql_query, [Number(req.params.id)], (error: any, row: any) => {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if (error !== null) {
            console.log("db error: ", error);
            res.status(400);
            return res.json({ error : error });
        }

        console.log("Status code: " + 200);
        return res.json({ work_order : row });
    });
});

// get all the assignee belonging to it.
router.get("/workorders/:id/assignees", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sql_query =
        "SELECT " +
        "users.id, " +
        "users.email, " +
        "users.name " +
        "FROM users " +
        "INNER JOIN work_order_assignees " +
        "ON users.id = work_order_assignees.user_id " +
        "WHERE work_order_assignees.work_order_id = ?"

    await db.all(sql_query, [Number(req.params.id)], (error: any, row: any) => {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if (error !== null) {
            console.log("db error: ", error);
            res.status(400);
            return res.json({ error : error });
        }

        console.log("Status code: " + 200);
        return res.json({ assignees : row });
    });
});


// first I was trying to create a single query where I can get
// the data in this format(posted below), from my research sqlite
// does not support nested query but I could be wrong.
// therefore I decided to split it into two seperate apis
// so the workload is not heavy on a single api.
// making two database calls in a single query might be overloading.
// {
//     "work_order": {
//     "name": "Walk Dog Morty around the block",
//         "status": "OPEN",
//         "id": 3,
//         "assignees": [
//         {
//             "user_id": 1,
//             "user_email": "alien@mortys.com",
//             "user_name": "Alien Morty"
//         },
//         {
//             "user_id": 4,
//             "user_email": "dawg@mortys.com",
//             "user_name": "Dog Morty"
//         }
//     ]
// }
// }
// router.get("/workorders/:id", async (req, res) => {
//     // const sql_query = "SELECT " +
//     //     "work_orders.name AS work_order_name,  " +
//     //     "work_orders.status, " +
//     //     "work_orders.id AS work_order_id, " +
//     //     "work_order_assignees.user_id, " +
//     //     "users.name AS user_name, " +
//     //     "users.email as user_email " +
//     //     //   "(" +
//     //     //     "SELECT " +
//     //     //     "users.id AS user_id, " +
//     //     //     "users.email AS user_email, " +
//     //     //     "users.name AS user_name " +
//     //     //     "FROM users" +
//     //     //     // "WHERE users.id IN work_order_assignees.user_id" +
//     //     // ") AS assignees " +
//     //     "FROM work_orders " +
//     //     "INNER JOIN work_order_assignees " +
//     //     "ON work_orders.id = work_order_assignees.work_order_id " +
//     //     "INNER JOIN users " +
//     //     "ON users.id = work_order_assignees.user_id " +
//     //     "WHERE work_orders.id = ?"
//
//     const sql_query =
//         "SELECT " +
//         "users.id, " +
//         "users.email, " +
//         "users.name " +
//         "FROM users " +
//         "INNER JOIN work_order_assignees " +
//         "ON users.id = work_order_assignees.user_id " +
//         "WHERE work_order_assignees.work_order_id = ?"
//     const response = await sql(sql_query, Number(req.params.id));
//     const assignees = response === [] ? [] : response;
//     const sql_query_2 = "SELECT " +
//         "work_orders.name,  " +
//         "work_orders.status, " +
//         "work_orders.id " +
//         "FROM work_orders " +
//         "WHERE work_orders.id = ? "
//     const response_2 = await sql(sql_query_2, Number(req.params.id));
//
//     const body = response_2[0];
//     body.assignees = assignees;
//
//     return res.json({ work_order : body});
// });




// updates the workorder chaning its status
router.put("/workorders/:id", async (req, res) => {
    const work_order = req.body;
    const sql_query = "UPDATE work_orders " +
        "SET status = ?" +
        "WHERE id = ?;"

    await db.run(sql_query, [work_order.status,  Number(req.params.id)], (error: any, row:any) => {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if (error !== null) {
            console.log("db error: ", error);
            return res.json({ error : error });
        }

        console.log("Status code: " + 200);
        return res.json({work_order : row});
    });
});


//creates a work order and return its id
// so later assignee can be added to it
router.post("/workorders/create", async (req, res) => {
    if (req.body.name === null) {
        res.status(400);
        res.json({"error": "name is empty"});
    } else if (typeof req.body.name !== 'string') {
        res.status(400);
        res.json({"error": "value is not type string"});
    } else if (req.body.name.length < 3) {
        res.status(400);
        res.json({"error": "name value cannot be less than 3"});
    }

    db.run("INSERT INTO work_orders (name, status)  VALUES ( ?, ?);", [req.body.name, "OPEN"], function(err: any, row:any) {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if(null == err){
            res.status(201);
            console.log("Status code: " + 201)
            // row inserted successfully
            // @ts-ignore
            return res.json({work_oder_id : this.lastID});
        } else {
            console.log("db error: ", err);
            console.log("Status code: " + 201);
            return res.json({ error : err });
        }
    });
});


//create assignees based on the workorder in the parms
router.post("/workorders/:id/assignees", async (req, res) => {
    if (req.body.user_id === null) {
        res.status(400);
        res.json({"error": "name is empty"});
    } else if (typeof req.body.user_id !== "number") {
        res.status(400);
        res.json({"error": "value is not type number"});
    }

    db.run("INSERT INTO work_order_assignees (work_order_id, user_id)  VALUES ( ?, ?);", [Number(req.params.id), req.body.user_id], function(err: any, row:any) {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if(null == err){
            // row inserted successfully
            res.status(201);
            console.log("Status code: " + 201)
            // @ts-ignore
            return res.json({user_id : req.body.user_id});
        } else {
            console.log("db error: ", err);
            console.log("Status code: " + 201);
            return res.json({ error : err });
        }
    });
});

module.exports = router;