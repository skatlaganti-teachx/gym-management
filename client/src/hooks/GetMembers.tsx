import { getAllMembers } from "@/lib/api-handlers";
import { Member } from "@/types/api";
import { useEffect, useState } from "react";

const GetMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const func = async () => {
            const memebers = await getAllMembers();
            setMembers(memebers);
        };
        func();
    }, []);

    return members;
}

export default GetMembers