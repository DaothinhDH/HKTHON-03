import React, { useState } from "react";

export default function Todolist() {
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) || [];
  });
  const [job, setJob] = useState("");
  const [edit, setEdit] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const index = edit;
    if (index !== -1) {
      const updatedJobs = [...jobs];
      updatedJobs[index].name = job;
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
      setEdit(-1);
    } else {
      const newJob = {
        id: Date.now(),
        status: false,
        name: job,
      };
      setJobs([...jobs, newJob]);
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
    }

    setJob("");
  };

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const handleUpdate = (index) => {
    setEdit(index);
    setJob(jobs[index].name);
  };

  const handleCheck = (id) => {
    const updatedJobs = jobs.map((jobItem) => {
      if (jobItem.id === id) {
        return { ...jobItem, status: !jobItem.status };
      }
      return jobItem;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <h3 style={{ marginBottom: 5 }}>TODO LIST</h3>
                  <p>Get Things done, one item at a time</p>
                  <hr />
                  <ul
                    className="nav nav-tabs mb-4 pb-2"
                    id="ex1"
                    role="tablist"
                  ></ul>

                  <div className="tab-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {jobs.map((jobItem, index) => (
                          <li
                            className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between"
                            key={jobItem.id}
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              {jobItem.status ? (
                                <s>{jobItem.name}</s>
                              ) : (
                                <span>{jobItem.name}</span>
                              )}
                            </div>
                            <div>
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={jobItem.status}
                                onChange={() => handleCheck(jobItem.id)}
                              />
                              <a
                                href="#!"
                                className="text-info"
                                title="Sửa công việc"
                                onClick={() => handleUpdate(index)}
                              >
                                <i className="fas fa-pencil-alt me-3" />
                              </a>
                              <a
                                href="#!"
                                className="text-danger"
                                title="Xóa công việc"
                                onClick={() => handleDelete(index)}
                              >
                                <i className="fas fa-trash-alt" />
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="d-flex justify-content-end gap-3 mb-4">
                        <p> Move done items at the and ?</p>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </div>

                      <h4>Add to the todo list</h4>
                      <form className="d-flex justify-content-center align-items-center mb-4">
                        <div className="input-group">
                          <input
                            type="text"
                            id="form2"
                            className="form-control"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                          />

                          <button
                            type="submit"
                            className="btn btn-add"
                            onClick={handleSubmit}
                          >
                            ADD Item
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
