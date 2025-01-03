import Chart from "./Chart"
import Table from "./Table"

const TableChart = () => {
    return (
        <div className="flex w-full gap-5">
            <div className="w-1/3">
                <Chart />
            </div>
            <div className="w-2/3">
                <Table />
            </div>
        </div>
    )
}

export default TableChart