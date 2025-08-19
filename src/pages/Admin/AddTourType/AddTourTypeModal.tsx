import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api"
import { toast } from "sonner"





export default function AddTourTypeModal() {
    const [addTourType] = useAddTourTypeMutation()
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await addTourType(values)

            if (res.data) {
                toast.success("Added Tour Type")
            }

            if (res.error) {
                toast.error("Already exists this type")
            }
            // console.log(res)
            // console.log(values)
        } catch (error) {
            console.log(error)
            toast.error("Already exists this type")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Tour Type</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Tour Type</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Add Tour Type</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="Type here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
