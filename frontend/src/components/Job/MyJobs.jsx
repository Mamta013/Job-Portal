import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div>
                    <span>Title:</span>
                    <p>{element.title}</p>
                  </div>
                  <div>
                    <span>Country:</span>
                    <p>{element.country}</p>
                  </div>
                  <div>
                    <span>City:</span>
                    <p>{element.city}</p>
                  </div>
                  <div>
                    <span>Category:</span>
                    <p>{element.category}</p>
                  </div>
                  <div>
                    <span>Salary:</span>
                    <p>
                      {element.fixedSalary
                        ? element.fixedSalary
                        : `${element.salaryFrom} - ${element.salaryTo}`}
                    </p>
                  </div>
                  <div>
                    <span>Expired:</span>
                    <p>{element.expired ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <span>Description:</span>
                    <p>{element.description}</p>
                  </div>
                  <div>
                    <span>Location:</span>
                    <p>{element.location}</p>
                  </div>
                </div>
                <div className="button_wrapper">
                  {editingMode === element._id ? (
                    <div className="edit_btn_wrapper">
                      <button
                        onClick={() => handleUpdateJob(element._id)}
                        className="check_btn"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={handleDisableEdit}
                        className="cross_btn"
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(element._id)}
                      className="edit_btn"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>
            You've not posted any job or maybe you deleted all of your jobs!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
