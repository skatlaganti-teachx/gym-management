import Header from "@/components/custom/Header"
import Stats from "./components/custom/Stats"
import TableChart from "./components/custom/TableChart"
import GetMembers from "./hooks/GetMembers";
import GetAttendance from "./hooks/GetAttendance";
import { useEffect, useState } from "react";
import { membersListType, StatsType } from "./types/types";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const members = GetMembers();
  const attendance = GetAttendance();
  const [membersList, setMembersList] = useState<membersListType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    totalMembers: 0,
    paidMembers: 0,
    unPaidMembers: 0,
    attendingMembers: 0,
  });

  useEffect(() => {
    const membersList = members.map((member) => {
      const attendanceData = attendance.find((att) => att.member_id === member.id);
      return {
        ...member,
        attending: attendanceData ? true : false,
        lastAttended: attendanceData ? attendanceData.check_in_time : "",
      };
    });
    setMembersList(membersList);
    setStats({
      totalMembers: membersList.length,
      paidMembers: membersList.filter((member) => member.fee_status === "paid").length,
      unPaidMembers: membersList.filter((member) => member.fee_status === "pending").length,
      attendingMembers: membersList.filter((member) => member.attending).length
    });
  }, [members, attendance]);

  return (
    <div className="flex justify-center items-start flex-col p-8 gap-5">
      <Toaster />
      <Header />
      <Stats stats={stats} />
      <TableChart members={membersList} />
    </div>
  )
}

export default App
