import { refreshAttendanceAtom } from "@/components/jotai/atoms";
import { getAttendance } from "@/lib/api-handlers";
import { Attendance } from "@/types/api";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const GetAttendance = () => {
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const refreshAttendance = useAtomValue(refreshAttendanceAtom);

    useEffect(() => {
        const func = async () => {
            const attendance = await getAttendance();
            setAttendance(attendance);
        };
        func();
    }, [refreshAttendance]);

    return attendance;

}

export default GetAttendance