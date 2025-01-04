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
    members
}: {
    members: membersListType[]
}) => {
    const [search, setSearch] = useState<string>("");
    const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(search.toLowerCase()));
    const randomAvatar = () => avatarImages[Math.floor(Math.random() * avatarImages.length)];

    return (
        <Card className="w-full">
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
                                <TableCell>{member.lastAttended}</TableCell>
                                <TableCell className="uppercase">{member.membership_type}</TableCell>
                                <TableCell>{member.program}</TableCell>
                                <TableCell className="text-right">{member.fee_status === "paid" ? <Badge>Paid</Badge> : <Badge variant={"destructive"}>Pending</Badge>}</TableCell>
                                <TableCell className="text-right w-10">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                View Attendance
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Check {member.attending ? "Out" : "In"}</DropdownMenuItem>
                                            <DropdownMenuItem>Change Fee Status</DropdownMenuItem>
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