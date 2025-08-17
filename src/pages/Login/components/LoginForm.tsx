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
import { useLoginMutation, useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import PasswordField from "@/pages/Register/components/PasswordField"
import { Link, useNavigate } from "react-router"


const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, { error: "Password is too short" }),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [loginForm] = useLoginMutation()
  const navigate = useNavigate()


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data)
    const userInfo = {
      email: data.email,
      password: data.password
    }
    console.log("Userinfo", userInfo)
    try {
      const res = await loginForm(userInfo).unwrap()
      console.log(res)
      toast.success("Logged in successful")
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("Your account is not verified. Please verify your account")
        navigate("/verify", { state: data.email })
      }
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
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="text-center flex items-center justify-center w-full text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/register"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  )
}
