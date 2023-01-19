import db from "../db";
import express from "express";

const router = express.Router();
let ts = Date.now();


//get all the users who are not assigned in a workorder
router.get("/productivity", async (req, res) => {
    const sql_query = "SELECT * " +
        "FROM users " +
        "WHERE id NOT IN (SELECT user_id FROM work_order_assignees);"

    res.header("Access-Control-Allow-Origin", "*");

    await db.all(sql_query, (error: any, row: any) => {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if (error !== null) {
            console.log("db error: ", error);
            res.status(400);
            return res.json({ error : error });
        }

        console.log("Status code: " + 200);
        return res.json({ user_list : row });
    });
});


// get all the available users
router.get("/users", async (req, res) => {
    const sql_query = "SELECT * " +
        "FROM users;"
    res.header("Access-Control-Allow-Origin", "*");

    await db.all(sql_query, (error: any, row: any) => {
        console.log("Date/time: " + ts);
        console.log("HTTP method: " + req.method);
        console.log("Path requested: " + "http://localhost:4000/api" + req.path);

        if (error !== null) {
            console.log("db error: ", error);
            return res.json({ error : error });
        }

        console.log("Status code: " + 200);
        return res.json({ users : row });
    });
});


module.exports = router;