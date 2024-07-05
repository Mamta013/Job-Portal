import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      });
      setJobs(response.data.jobs); // Assuming "jobs" is nested under "data"
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!searchTerm || searchTerm.trim() === "") {
      return; // Handle empty search term gracefully (optional: display a message)
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/job/search", {
        keyword: searchTerm,
      }, {
        withCredentials: true,
      });

      setJobs(response.data.jobs); // Assuming "jobs" is nested under "data"
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    fetchAllJobs();
  };

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search jobs by title, category, etc."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={handleClear}>Clear Results</button>
        </form>
        <div className="banner">
          {jobs.map((element) => (
            <div className="card" key={element._id}>
              <p>{element.title}</p>
              <p>{element.category}</p>
              <p>{element.country}</p>
              <Link to={`/job/${element._id}`}>Job Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
