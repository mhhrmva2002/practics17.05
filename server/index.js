const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT=8080;
const fakeData= [
    {
        id:1,
        name: "alis",
        surname:"xsxs",
        birthdate:"2002",
        faculty:"biology",
        occupation:"biology",
        isMarried:"true",
        GPA:70
    },
    {
        id:2,
        name: "ali",
        surname:"sxxsxs",
        birthdate:"2001",
        faculty:"fizik",
        occupation:"fizika",
        isMarried:"false",
        GPA:80
    },
    {
        id:3,
        name: "yazgul",
        surname:"Mammadli",
        birthdate:"2002",
        faculty:"TRK",
        occupation:"informatika",
        isMarried:"false",
        GPA:90
    },
]

//get All Student
app.get("/api/students", (req, res) => {
    const { name } = req.query;
    if (name === undefined) {
      res.status(200).send({
        data: fakeData,
      });
    } else {
      res.status(200).send({
        data: fakeData.filter(
          (x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        ),
        message: "data get success!",
      });
    }
  });
  //get Students by ID
  app.get("/api/students/:id", (req, res) => {
    const id = req.params.id;
    const student = fakeData.find((x) => x.id === parseInt(id));
    if (!student) {
      console.log("test");
      res.status(204).send("student not found!");
      // return;
    } else {
      res.status(200).send({
        data: student,
        message: "data get success!",
      });
    }
  });
  //delete student by ID
  app.delete("/api/students/:id", (req, res) => {
    const id = req.params.id;
    const student = fakeData.find((x) => x.id == id);
    if (student === undefined) {
      res.status(404).send("student not found");
    } else {
      const idx = fakeData.indexOf(student);
      fakeData.splice(idx, 1);
      res.status(203).send({
        data: student,
        message: "student deleted successfully",
      });
    }
  });
  //post
  app.post("/api/students",(req, res) => {
    const { name, surname, birthdate,faculty, occupation, isMarried, GPA } = req.body;
    const newStudent = {
      id: crypto.randomUUID(),
      name: name,
      surname: surname,
      birthdate: birthdate,
      faculty: faculty,
      occupation: occupation,
      isMarried: isMarried,
      GPA: GPA,
    };
    fakeData.push(newStudent);
    res.status(201).send("created");
  });
  //put
  app.put("/api/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, surname, birthdate,faculty, occupation, isMarried, GPA } = req.body;
    const existedStudent = fakeData.find((x) => x.id == id);
    if (existedStudent == undefined) {
      res.status(404).send("student not found!");
    } else {
      if (name) {
        existedStudent.name = name;
      }
      if (surname) {
        existedStudent.surname = surname;
      }
      if (birthdate) {
        existedStudent.birthdate = birthdate;
      }
      if (faculty) {
        existedStudent.faculty = faculty;
      }
      if (occupation) {
        existedStudent.occupation = occupation;
      }
      if (isMarried) {
        existedStudent.isMarried = isMarried;
      } 
      if (GPA) {
        existedStudent.GPA = GPA;
      }
      res.status(200).send(`student: ${existedStudent.name}`);
    }
  });
  
  app.listen(PORT, () => {
      console.log(`NODE APP listening on port ${PORT}`);
  });