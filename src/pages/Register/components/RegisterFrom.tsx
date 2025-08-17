import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordField from "./PasswordField"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router"


const registerSchema = z.object({
  name: z.string().min(4, { error: "Min character is 4" }).max(50),
  email: z.email(),
  password: z.string().min(6, { error: "Password is too short" }),
  confirmPassword: z.string().min(6)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"]
})

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [registerForm] = useRegisterMutation()
  const navigate = useNavigate()


  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    console.log(data)
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    console.log("Userinfo", userInfo)
    try {
      const res = await registerForm(userInfo).unwrap()
      console.log(res)
      toast.success("Registered successful")
      navigate("/verify")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to register an account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Password" type="password" {...field} /> */}
                    <PasswordField {...field} name={"confirmPassword"} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Confirm password" type="password" {...field} /> */}
                    <PasswordField {...field} name={"confirmPassword"} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your confirm password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Already have have an account?{" "}
        <Link to={"/login"}  className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  )
}
