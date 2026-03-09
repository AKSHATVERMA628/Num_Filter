const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

/* ---------------- FILTER API ---------------- */

app.post("/filter", upload.single("file"), (req, res) => {

    const inputNumber = req.body.number;

    if (!req.file) {
        return res.status(400).json({ message: "Excel file required" });
    }

    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    const prefix = inputNumber.toString();

    const results = [];

    data.forEach(row => {

        const number = row.PhoneNumber?.toString();

        if (number && number.startsWith(prefix)) {
            results.push(number);
        }

    });

    fs.unlinkSync(req.file.path);

    res.json({
        count: results.length,
        numbers: results
    });

});


/* ---------------- DOWNLOAD API ---------------- */

app.post("/download", upload.single("file"), (req, res) => {

    const inputNumber = req.body.number;

    if (!req.file) {
        return res.status(400).json({ message: "Excel file required" });
    }

    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    const prefix = inputNumber.toString();

    const results = [];

    data.forEach(row => {

        const number = row.PhoneNumber?.toString();

        if (number && number.startsWith(prefix)) {
            results.push({ PhoneNumber: number });
        }

    });

    const newWorkbook = XLSX.utils.book_new();

    const newSheet = XLSX.utils.json_to_sheet(results);

    XLSX.utils.book_append_sheet(newWorkbook, newSheet, "FilteredNumbers");

    const filePath = "filtered_numbers.xlsx";

    XLSX.writeFile(newWorkbook, filePath);

    res.download(filePath, "filtered_numbers.xlsx", () => {

        fs.unlinkSync(filePath);
        fs.unlinkSync(req.file.path);

    });

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});