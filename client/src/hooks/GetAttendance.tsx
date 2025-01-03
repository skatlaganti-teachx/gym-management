import { getAttendance } from "@/lib/api-handlers";
import { Attendance } from "@/types/api";
import { useEffect, useState } from "react";

const GetAttendance = () => {
    const [attendance, setAttendance] = useState<Attendance[]>([]);

    useEffect(() => {
        const func = async () => {
            const attendance = await getAttendance();
            setAttendance(attendance);
        };
        func();
    }, []);

    return attendance;

}

export default GetAttendance