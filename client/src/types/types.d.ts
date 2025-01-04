import { Member } from "./api";

interface StatsType {
  totalMembers: number;
  paidMembers: number;
  unPaidMembers: number;
  attendingMembers: number;
}

interface membersListType extends Member {
  attending: boolean;
  lastAttended: string;
}

export type { StatsType, membersListType };
