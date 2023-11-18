const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

//get all employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

//add employee
app.post("/employees", (req, res) => {
  var emp = req.body;
  var empData = [emp.name, emp.employee_code, emp.salary];
  db.query(
    "INSERT INTO employees(name,employee_code,salary) VALUES(?)",
    [empData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

//upadte employee data if exist otherwise insert that new employee
app.put("/employees", (req, res) => {
  var emp = req.body;
  db.query("UPDATE employees SET ? WHERE id=" + emp.id, [emp], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      if (rows.affectedRows == 0) {
        var emp = req.body;
        var empData = [emp.name, emp.employee_code, emp.salary];
        db.query(
          "INSERT INTO employees(name,employee_code,salary) VALUES(?)",
          [empData],
          (err, rows) => {
            if (err) {
              console.log(err);
            } else {
              res.send(rows);
            }
          }
        );
      }else{
        res.send(rows);
      }
    }
  });
});

//get employee by id
app.get("/employees/:id", (req, res) => {
  db.query(
    "SELECT * FROM employees where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

//delete employee by id
app.delete("/employees/:id", (req, res) => {
  db.query("DELETE FROM employees where id=?", [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

app.listen(3000, () => console.log("Express server is running on port 3000"));
