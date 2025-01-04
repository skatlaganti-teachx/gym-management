import { membersListType } from "@/types/types"
import Chart from "./Chart"
import Table from "./Table"
import { Attendance } from "@/types/api"

const TableChart = ({
    members,
    attendance
}: {
    members: membersListType[],
    attendance: Attendance[]
}) => {
    return (
        <div className="flex w-full gap-5 flex-col sm:flex-row">
            <div className="w-full sm:w-1/3">
                <Chart members={members} />
            </div>
            <div className="w-full sm:w-2/3">
                <Table attendance={attendance} members={members} />
            </div>
        </div>
    )
}

export default TableChart