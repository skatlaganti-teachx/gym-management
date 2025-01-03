import {
  Attendance,
  AttendanceRequest,
  FeeStatusRequest,
  Member,
  MemberRequest,
} from "@/types/api";

const getAllMembers = async (): Promise<Member[]> => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:8000/members")
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

const addMember = async (member: MemberRequest) => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:8000/add_member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

const updateFeeStatus = async (feeStatus: FeeStatusRequest) => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:8000/update_fee_status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feeStatus),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

const recordAttendance = async (attendance: AttendanceRequest) => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:8000/record_attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

const getAttendance = async (): Promise<Attendance[]> => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:8000/attendance")
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

const deleteAll = async () => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:8000/delete_all", {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

export {
  getAllMembers,
  addMember,
  updateFeeStatus,
  recordAttendance,
  getAttendance,
  deleteAll,
};
