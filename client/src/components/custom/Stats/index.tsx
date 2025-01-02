import { PiUsersFour } from "react-icons/pi"
import Stat from "./Stat"

const Stats = () => {
    return <div className="flex justify-center items-center w-full gap-7">
        <Stat title={"Total Members"} Icon={PiUsersFour} value={5} />
        <Stat title={"Total Members"} Icon={PiUsersFour} value={5} />
        <Stat title={"Total Members"} Icon={PiUsersFour} value={5} />
        <Stat title={"Total Members"} Icon={PiUsersFour} value={5} />
    </div>
}

export default Stats