import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import AddTourTypeModal from "./AddTourTypeModal"
import { DeleteConfirmation } from "@/components/common/DeleteConfirmation"



export default function AddTourType() {
    const { data } = useGetTourTypesQuery(undefined)
    console.log(data)
    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center my-5">
                <h1 className="text-2xl font-bold">Tour Types</h1>
                <AddTourTypeModal />

            </div>
            <div className="border  p-5 rounded-lg">
                <Table className="rounded-lg">
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map(((item: any) => (
                                <TableRow className="rounded-lg">
                                    <TableCell className="font-medium ">{item.name}</TableCell>
                                    <TableCell className="font-medium text-right"><Button  size={"sm"}><Trash /><DeleteConfirmation/></Button></TableCell>
                                </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
