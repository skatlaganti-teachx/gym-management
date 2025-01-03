import Header from "@/components/custom/Header"
import Stats from "./components/custom/Stats"
import TableChart from "./components/custom/TableChart"
import GetMembers from "./hooks/GetMembers";
import GetAttendance from "./hooks/GetAttendance";
import { useEffect, useState } from "react";
import { StatsType } from "./types/types";

function App() {
  const members = GetMembers();
  const attendance = GetAttendance();

  const [stats, setStats] = useState<StatsType>({
    totalMembers: 0,
    paidMembers: 0,
    unPaidMembers: 0,
    attendingMembers: 0,
  });

  useEffect(() => {
    setStats({
      totalMembers: members.length,
      paidMembers: members.filter((member) => member.fee_status === "paid").length,
      unPaidMembers: members.filter((member) => member.fee_status === "pending").length,
      attendingMembers: attendance.filter((att) => att.check_in_time && att.check_out_time === null).length
    });
  }, [members, attendance]);

  return (
    <div className="flex justify-center items-start flex-col p-8 gap-5">
      <Header />
      <Stats stats={stats} />
      <TableChart />
    </div>
  )
}

export default App
