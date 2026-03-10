import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [file, setFile] = useState(null);
  const [number, setNumber] = useState("");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  const handleFilter = async () => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("number", number);

    const res = await axios.post(
      "https://num-filter.onrender.com/filter",
      formData
    );

    setResults(res.data.numbers);
    setCount(res.data.count);
  };

  const handleDownload = async () => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("number", number);

    const res = await axios.post(
      "https://num-filter.onrender.com/download",
      formData,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", "filtered_numbers.xlsx");

    document.body.appendChild(link);

    link.click();

  };

  return (

    <div className="main-container">

      <div className="card">

        <h1>Excel Number Filter</h1>

        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
        />

        <br/><br/>

        <input
          type="text"
          placeholder="Enter prefix"
          value={number}
          onChange={(e)=>setNumber(e.target.value)}
        />

        <br/><br/>

        <button onClick={handleFilter}>
          Filter Numbers
        </button>

        <button onClick={handleDownload}>
          Download Excel
        </button>

        <h3>Matches: {count}</h3>

        <div className="results">

          {results.map((num,index)=>(
            <p key={index}>{num}</p>
          ))}

        </div>

      </div>

    </div>

  );
}

export default App;