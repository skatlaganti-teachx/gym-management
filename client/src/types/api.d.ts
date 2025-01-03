interface Member {
  id: number;
  name: string;
  memebership_type: string;
  program: string;
  fee_status: "pending" | "paid";
}

interface Attendance {
  member_id: number;
  name: string;
  check_in_time: string;
  check_out_time: string | null;
}

interface AttendanceRequest {
  member_id: number;
  action: "in" | "out";
}

interface MemberRequest {
  name: string;
  membership_type: string;
  program: string;
}

interface FeeStatusRequest {
  member_id: int;
  fee_status: "pending" | "paid";
}

export type {
  Member,
  Attendance,
  AttendanceRequest,
  MemberRequest,
  FeeStatusRequest,
};
