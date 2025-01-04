import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table as ShadCNTable,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Attendance } from "@/types/api";
import { membersListType } from "@/types/types";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const ViewAttendance = ({
    member,
    attendance,
    children
}: {
    member: membersListType,
    attendance: Attendance[],
    children: JSX.Element
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const logs = useMemo(() => {
        return attendance.filter((a) => a.member_id === member.id)
    }, [attendance, member]);

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full" onClick={() => setIsOpen(true)}>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{member.name}'s Attendace</DialogTitle>
                <DialogDescription>
                    View detailed logs of user's attendance.
                </DialogDescription>
            </DialogHeader>
            <ShadCNTable>
                <TableCaption>
                    {member.name}'s Attendance Logs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Check IN</TableHead>
                        <TableHead>Check OUT</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.map((log, i) => <TableRow key={i}>
                        <TableCell>{dayjs(log.check_in_time).format("DD MMM YYYY, hh:mm A")}</TableCell>
                        <TableCell>{log.check_out_time ? dayjs(log.check_out_time).format("DD MMM YYYY, hh:mm A") : ""}</TableCell>
                    </TableRow>)}
                </TableBody>
            </ShadCNTable>
            <DialogFooter>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

export default ViewAttendance