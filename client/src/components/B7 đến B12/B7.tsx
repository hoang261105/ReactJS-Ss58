import axios, { AxiosResponse } from "axios";
import "./B7.css";
import React, { useEffect, useState } from "react";

interface Students {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function B7() {
  const [students, setStudents] = useState<Students[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<Students>({
    id: Math.ceil(Math.random() * 10000),
    student_name: "",
    email: "",
    address: "",
    phone: "",
    status: false,
    created_at: "",
  });
  const loadData = () => {
    axios
      .get("http://localhost:3000/students")
      .then((data: AxiosResponse<Students[]>) => setStudents(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [inputValue]);

  // Reset giá trị trong form
  const resetData = () => {
    setInputValue({
      id: Math.ceil(Math.random() * 10000),
      student_name: "",
      email: "",
      address: "",
      phone: "",
      status: false,
      created_at: "",
    });
  };
  // Hàm xóa sinh viên
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then(() => {
        students.filter((student) => student.id !== id);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  // Hàm thêm sinh viên
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/students", inputValue)
      .then(() => {
        loadData();
        resetData();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Cập nhật lại state
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Quản lý <b>sinh viên</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn
                              btn-success"
                    data-toggle="modal"
                  >
                    <i className="material-icons"></i>
                    <span>Thêm mới sinh viên</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll" />
                    </span>
                  </th>
                  <th>Tên sinh viên</th>
                  <th>Email</th>
                  <th>Địc chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: Students) => (
                  <tr>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox5"
                          name="options[]"
                          defaultValue={1}
                        />
                        <label htmlFor="checkbox5" />
                      </span>
                    </td>
                    <td>{student.student_name}</td>
                    <td>{student.email}</td>
                    <td>{student.address}</td>
                    <td>{student.phone}</td>
                    <td>
                      <a
                        href="#editEmployeeModal"
                        className="edit"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          
                        </i>
                      </a>
                      <a
                        href="#deleteEmployeeModal"
                        className="delete"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                          onClick={() => setSelectedStudentId(student.id)}
                        >
                          
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="clearfix">
              <div className="hint-text">
                Hiển thị <b>5</b>/<b>{students.length} </b>bản ghi
              </div>
              <ul className="pagination">
                <li className="page-item disabled">
                  <a href="#">Trước</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    2
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#" className="page-link">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    Sau
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal HTML */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Thêm mới sinh viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sinh viên</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="student_name"
                    onChange={handleChange}
                    value={inputValue.student_name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    name="email"
                    onChange={handleChange}
                    value={inputValue.email}
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    className="form-control"
                    required
                    defaultValue={""}
                    name="address"
                    onChange={handleChange}
                    value={inputValue.address}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone"
                    onChange={handleChange}
                    value={inputValue.phone}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-success"
                  defaultValue="Add"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit Modal HTML */}
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Sửa thông tin sinh viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sinh viên</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <textarea
                    className="form-control"
                    required
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Thoát"
                />
                <input
                  type="submit"
                  className="btn btn-info"
                  defaultValue="Lưu"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Delete Modal HTML */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Xóa nhân viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Bạn chắc chắn muốn xóa sinh viên&lt;ST001&gt;?</p>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Hủy"
                />
                <input
                  type="submit"
                  className="btn btn-danger"
                  defaultValue="Xóa"
                  onClick={() => {
                    if (selectedStudentId !== null) {
                      handleDelete(selectedStudentId);
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
