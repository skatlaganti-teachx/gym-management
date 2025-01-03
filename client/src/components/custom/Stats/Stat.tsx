import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconType } from "react-icons"

const Stat = ({
    title,
    Icon,
    value
}: {
    title: string,
    value: number,
    Icon: IconType
}) => {
    return <Card className="w-full">
        <CardHeader className="pt-3">
            <div className="flex justify-between items-center">
                <CardTitle className="font-teko">
                    {title}
                </CardTitle>
                <Icon size="30px" />
            </div>
        </CardHeader>
        <CardContent className="pb-3">
            <h1 className="uppercase font-teko scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
                {value}
            </h1>
        </CardContent>
    </Card>
}

export default Stat