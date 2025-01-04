import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { LuUserRoundPlus } from "react-icons/lu";
import { z } from 'zod'
import Loader from "../Loader"
import { MemberRequest } from "@/types/api"
import { addMember } from "@/lib/api-handlers"
import { useSetAtom } from "jotai"
import { refreshMembersAtom } from "@/components/jotai/atoms"

const AddMemberSchema = z.object({
    name: z.string().min(3).max(255),
    program: z.string().min(3).max(255),
    membership_type: z.literal('monthly', {
        message: 'Membership type must be selected'
    }).or(z.literal('yearly', {
        message: 'Membership type must be selected'
    }))
})

const paths = {
    name: "Name",
    program: "Program",
    membership_type: "Membership Type"
}

const AddMember = () => {
    const { toast } = useToast();
    const refreshMembersSetter = useSetAtom(refreshMembersAtom);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [states, setStates] = useState({
        name: '',
        program: '',
        membership_type: ''
    });

    const cancel = () => {
        setOpen(false);
        setLoading(false);
        setStates({
            name: '',
            program: '',
            membership_type: ''
        });
    }

    const add = async () => {
        try {
            setLoading(true);
            const results = AddMemberSchema.safeParse(states);
            if (!results.success) {
                const errorMessages = results.error.errors.map(error => {
                    const field = paths[error.path.join('') as keyof typeof paths];
                    return `${field}: ${error.message}`;
                }).join(', ');
                toast({
                    title: 'Validation Error',
                    description: errorMessages,
                    variant: 'destructive'
                });
                setLoading(false);
                return;
            }
            const payload: MemberRequest = {
                membership_type: states.membership_type,
                name: states.name,
                program: states.program
            };
            const resp = await addMember(payload);
            refreshMembersSetter(prev => !prev);
            toast({
                title: 'Member Added',
                description: resp.message,
                variant: 'default'
            });
            cancel();
        } catch (err) {
            setLoading(false);
            toast({
                title: 'Error',
                description: String(err),
                variant: 'destructive'
            });
        }
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        {loading && <Loader />}
        <DialogTrigger>
            <Button size="sm" onClick={() => setOpen(true)}><LuUserRoundPlus /> Add Member</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Member</DialogTitle>
                <DialogDescription>
                    Enter details for the new member. Click add when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={states.name} onChange={e => setStates(prev => ({
                        ...prev,
                        name: e.target.value
                    }))} placeholder="eg: Rob Stark" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program" className="text-right">
                        Program
                    </Label>
                    <Input id="program" value={states.program} onChange={e => setStates(prev => ({
                        ...prev,
                        program: e.target.value
                    }))} placeholder="eg: Yoga, Weighlifting" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="membership_type" className="text-right">
                        Membership
                    </Label>
                    <Select value={states.membership_type} onValueChange={e => {
                        setStates(prev => ({
                            ...prev,
                            membership_type: e
                        }))
                    }}>
                        <SelectTrigger className="col-span-3" >
                            <SelectValue placeholder="Membership Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant={"outline"} onClick={cancel}>Cancel</Button>
                <Button onClick={add}>Add</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

}

export default AddMember