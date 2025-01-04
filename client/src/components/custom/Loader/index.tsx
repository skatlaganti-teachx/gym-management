import { Loader2 } from "lucide-react"

const Loader = () => {
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>
            <div className="flex justify-center items-center w-full h-full fixed inset-0 z-50">
                <Loader2 className="animate-spin z-50" />
            </div>
        </>
    )
}

export default Loader