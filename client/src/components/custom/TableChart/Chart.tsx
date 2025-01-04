import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/ui/theme-provider";
import { membersListType } from "@/types/types"
import { RadialBar } from '@ant-design/plots';
import { useMemo } from "react";

const Chart = ({
    members
}: {
    members: membersListType[]
}) => {
    const { theme } = useTheme();
    const graphData = useMemo(() => {
        const paidMembers = members.filter((member) => member.fee_status === "paid").length;
        const unPaidMembers = members.filter((member) => member.fee_status === "pending").length;
        const attendingMembers = members.filter((member) => member.attending).length;
        const totalMembers = members.length;
        return [
            { name: 'UnPaid', stat: unPaidMembers },
            { name: 'Paid', stat: paidMembers },
            { name: 'Attending', stat: attendingMembers },
            { name: 'Total', stat: totalMembers },
        ];
    }, [members]);


    const config = {
        data: graphData,
        xField: 'name',
        yField: 'stat',
        maxAngle: 300,
        radius: 1,
        innerRadius: 0.4,
        tooltip: {
            items: ['stat'],
        },
        legend: true,
        axis: {
            y: false,
        },
        style: {
            radius: 180,
            fill: ({ name }: { name: string }) => {
                if (name === "Total") {
                    return "#5B8FF9"
                } else if (name === "UnPaid") {
                    return "red"
                }
                else if (name === "Paid") {
                    return "#F6BD16"
                }
                else {
                    return "#5AD8A6"
                }
            },
        },
    }

    return (
        <Card className="w-full">
            <RadialBar height={350} {...config} theme={theme} />
        </Card>
    )
}

export default Chart