import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"
import Loader from "../Loader";
import { deleteAll } from "@/lib/api-handlers";
import { useSetAtom } from "jotai";
import { refreshAttendanceAtom, refreshMembersAtom } from "@/components/jotai/atoms";

const ResetAll = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const refreshMembersSetter = useSetAtom(refreshMembersAtom);
    const refreshAttendanceSetter = useSetAtom(refreshAttendanceAtom);

    const deleteData = async () => {
        setLoading(true);
        try {
            await deleteAll();
            refreshAttendanceSetter((prev) => !prev);
            refreshMembersSetter((prev) => !prev);
            toast({
                title: 'Success',
                description: 'All data has been reset',
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

    return <>
        {loading && <Loader />}
        <AlertDialog>
            <AlertDialogTrigger>
                <Button size={"sm"} variant={"destructive"}>Reset All</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteData}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}

export default ResetAll