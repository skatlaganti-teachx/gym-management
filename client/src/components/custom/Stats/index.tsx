import { PiUsersFour } from "react-icons/pi"
import Stat from "./Stat"
import { StatsType } from "@/types/types"

const Stats = ({
    stats
}: {
    stats: StatsType
}) => {
    return <div className="flex justify-center items-center w-full gap-7">
        <Stat title={"Total Members"} Icon={PiUsersFour} value={stats.totalMembers} />
        <Stat title={"Attending Members"} Icon={PiUsersFour} value={stats.attendingMembers} />
        <Stat title={"Paid Members"} Icon={PiUsersFour} value={stats.paidMembers} />
        <Stat title={"Unpaid Members"} Icon={PiUsersFour} value={stats.unPaidMembers} />
    </div>
}

export default Stats