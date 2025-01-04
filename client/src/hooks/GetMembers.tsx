import { refreshMembersAtom } from "@/components/jotai/atoms";
import { getAllMembers } from "@/lib/api-handlers";
import { Member } from "@/types/api";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const GetMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const refreshMembers = useAtomValue(refreshMembersAtom);

    useEffect(() => {
        const func = async () => {
            const memebers = await getAllMembers();
            setMembers(memebers);
        };
        func();
    }, [refreshMembers]);

    return members;
}

export default GetMembers