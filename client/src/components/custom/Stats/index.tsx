import { PiUsersFour } from "react-icons/pi"
import Stat from "./Stat"
import { StatsType } from "@/types/types"
import { MdMoneyOffCsred, MdOutlinePaid } from "react-icons/md"
import { LuUserRoundCheck } from "react-icons/lu"

const Stats = ({
    stats
}: {
    stats: StatsType
}) => {
    return <div className="flex justify-center items-center w-full gap-7 flex-col lg:flex-row">
        <div className="flex justify-center items-center w-full gap-7 flex-col sm:flex-row">
            <Stat title={"Total Members"} Icon={PiUsersFour} value={stats.totalMembers} />
            <Stat title={"Attending Members"} Icon={LuUserRoundCheck} value={stats.attendingMembers} />
        </div>
        <div className="flex justify-center items-center w-full gap-7 flex-col sm:flex-row">
            <Stat title={"Paid Members"} Icon={MdOutlinePaid} value={stats.paidMembers} />
            <Stat title={"Unpaid Members"} Icon={MdMoneyOffCsred} value={stats.unPaidMembers} />
        </div>
    </div>
}

export default Stats