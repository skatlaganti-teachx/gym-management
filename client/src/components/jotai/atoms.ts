import { atom } from "jotai";

const refreshMembersAtom = atom(false);
const refreshAttendanceAtom = atom(false);

export { refreshMembersAtom, refreshAttendanceAtom };
