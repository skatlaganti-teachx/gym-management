import { membersListType } from "@/types/types"
import Chart from "./Chart"
import Table from "./Table"

const TableChart = ({
    members
}: {
    members: membersListType[]
}) => {
    return (
        <div className="flex w-full gap-5">
            <div className="w-1/3">
                <Chart members={members} />
            </div>
            <div className="w-2/3">
                <Table members={members} />
            </div>
        </div>
    )
}

export default TableChart