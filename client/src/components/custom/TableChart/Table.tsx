import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table as ShadCNTable,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AddMember from "./AddMember";
import { membersListType } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "../ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import Loading from "../Loader";
import { Attendance, AttendanceRequest, FeeStatusRequest } from "@/types/api";
import { recordAttendance, updateFeeStatus } from "@/lib/api-handlers";
import { useSetAtom } from "jotai";
import { refreshAttendanceAtom, refreshMembersAtom } from "@/components/jotai/atoms";
import dayjs from "dayjs";
import ViewAttendance from "./ViewAttendance";

const avatarImages = [
    "https://avatar.iran.liara.run/public/39",
    "https://avatar.iran.liara.run/public/34",
    "https://avatar.iran.liara.run/public/26",
    "https://avatar.iran.liara.run/public/43",
    "https://avatar.iran.liara.run/public/37",
    "https://avatar.iran.liara.run/public/36",
    "https://avatar.iran.liara.run/public/16",
    "https://avatar.iran.liara.run/public/48",
    "https://avatar.iran.liara.run/public/25",
    "https://avatar.iran.liara.run/public/44",
    "https://avatar.iran.liara.run/public/28",
    "https://avatar.iran.liara.run/public/3",
    "https://avatar.iran.liara.run/public/15",
    "https://avatar.iran.liara.run/public/4",
    "https://avatar.iran.liara.run/public/21",
    "https://avatar.iran.liara.run/public/38",
]

const Table = ({
    members,
    attendance
}: {
    members: membersListType[],
    attendance: Attendance[]
}) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const refreshAttendanceSetter = useSetAtom(refreshAttendanceAtom);
    const refreshMembersSetter = useSetAtom(refreshMembersAtom);
    const [search, setSearch] = useState<string>("");
    const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(search.toLowerCase()));
    const randomAvatar = () => avatarImages[Math.floor(Math.random() * avatarImages.length)];

    const changeFeeStatus = async (member: membersListType) => {
        setLoading(true);
        try {
            const payload: FeeStatusRequest = {
                member_id: member.id,
                fee_status: member.fee_status === "paid" ? "pending" : "paid"
            }
            await updateFeeStatus(payload);
            refreshMembersSetter((prev) => !prev);
            toast({
                title: 'Success',
                description: `Fee status of ${member.name} has been changed to ${member.fee_status === "paid" ? "pending" : "paid"}`,
                variant: 'default'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: String(error),
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    const changeCheckInStatus = async (member: membersListType) => {
        setLoading(true);
        try {
            const payload: AttendanceRequest = {
                member_id: member.id,
                action: member.attending ? "out" : "in"
            }
            await recordAttendance(payload);
            refreshAttendanceSetter((prev) => !prev);
            refreshMembersSetter((prev) => !prev);
            toast({
                title: 'Success',
                description: `${member.attending ? "Checked out" : "Checked in"} ${member.name}`,
                variant: 'default'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: String(error),
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full min-h-full">
            {loading && <Loading />}
            <CardHeader className="p-3">
                <div className="w-full flex justify-between items-center">
                    <Input className="max-w-[200px]" type="search" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                    <AddMember />
                </div>
            </CardHeader>
            <CardContent className="px-0 border-t-2">
                <ShadCNTable>
                    <TableCaption>A list of all gym members.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead>Attending</TableHead>
                            <TableHead>Last Attended</TableHead>
                            <TableHead>Membership Type</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead className="text-right">Fee Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredMembers.length ? filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium flex gap-2 justify-start items-center">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={randomAvatar()} />
                                        <AvatarFallback>{member.name[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {member.name}</TableCell>
                                <TableCell>
                                    <div className="flex justify-start items-center gap-2">
                                        {member.attending ? <><div className="bg-[#10c97a] w-[10px] h-[10px] rounded-full animate-pulse"></div> Yes</> : "No"}
                                    </div>
                                </TableCell>
                                <TableCell>{member.lastAttended ? dayjs(member.lastAttended).format(
                                    "DD MMM YYYY, hh:mm A"
                                ) : ""}</TableCell>
                                <TableCell className="uppercase">{member.membership_type}</TableCell>
                                <TableCell>{member.program}</TableCell>
                                <TableCell className="text-right">{member.fee_status === "paid" ? <Badge>Paid</Badge> : <Badge variant={"destructive"}>Pending</Badge>}</TableCell>
                                <TableCell className="text-right w-30">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <ViewAttendance member={member} attendance={attendance}>
                                                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                                    View Attendance
                                                </DropdownMenuItem>
                                            </ViewAttendance>
                                            <DropdownMenuSeparator />
                                            <ConfirmDialog description={
                                                `Are you sure you want to ${member.attending ? "check out" : "check in"} ${member.name}?`
                                            } actionText={member.attending ? "Check Out" : "Check In"} onConfirm={() => changeCheckInStatus(member)}>
                                                <DropdownMenuItem onSelect={e => e.preventDefault()}>Check {member.attending ? "Out" : "In"}</DropdownMenuItem>
                                            </ConfirmDialog>
                                            <ConfirmDialog description={
                                                `Are you sure you want to change the fee status of ${member.name}?`
                                            } actionText={
                                                member.fee_status === "paid" ? "Mark as Pending" : "Mark as Paid"
                                            } onConfirm={() => changeFeeStatus(member)}>
                                                <DropdownMenuItem onSelect={e => e.preventDefault()}>Change Fee Status</DropdownMenuItem>
                                            </ConfirmDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </ShadCNTable>
            </CardContent>
        </Card>
    )
}

export default Table