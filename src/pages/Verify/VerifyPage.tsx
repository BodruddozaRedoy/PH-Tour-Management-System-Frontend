import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export const VerifyPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [codeSent, setCodeSent] = useState(false)
    const [timer, setTimer] = useState(0)
    const [email] = useState(location.state)
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    useEffect((): void | any => {
        if (!email) {
            return navigate("/")
        }
    }, [email])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
        },
    })

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                email: email,
                otp: data.otp
            }
            console.log(payload)
            const res = await verifyOtp(payload).unwrap()
            console.log(res)
            toast.success("Otp Verified")
            navigate("/")
        } catch (error:any) {
            console.log(error)
            toast.error(error.data.message)
        }
    }

    const handleGetCode = async () => {
        const toastId = toast.loading("Otp sending...")
        try {
            const res = await sendOtp({ email }).unwrap()
            if (res.success) {
                toast.success("Otp sent to your email", { id: toastId })
                setTimer(10)
                setCodeSent(true)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (email && codeSent) {
            const timerID = setTimeout(() => {
                setTimer(prev => prev > 0 ? prev - 1 : 0)
                console.log("Tick")
            }, 1000);
            return () => clearInterval(timerID)
        }
    }, [email, codeSent, timer])

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify your email address</CardTitle>
                    <CardDescription>
                        <p>{email}</p>
                    </CardDescription>
                    <CardAction>
                        <Button disabled={timer !== 0} onClick={handleGetCode} variant="link">{codeSent ? `Resend (${timer})` : "Get Code"}</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={1} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <Dot />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={4} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Please enter you 6-digit code here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};