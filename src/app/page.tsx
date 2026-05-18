"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import exciteLoginLogo from "@/public/assets/svgFiles/loginLogo.svg";
import { useReactMutation } from "@/src/services/apiHelper";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { Checkbox } from "../components/ui/checkbox";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate, isPending } = useReactMutation<any, any>(
    "post"
  );

  function onSubmit({ email, password }: FormSchema) {
    mutate(
    {
      path:'/auth/login',
      data:{
        email,
        password,
      }
    },
    {
      onSuccess: ({ data }) => {
        console.log("Success data: ", data);

        toast.error("Success", { description: data?.message });
        setCookie("token", data?.data?.token, { maxAge: 60 * 60 * 24 });
        router.push("/dashboard");
      },
      

      onError: (err: unknown) => {
        if (err instanceof AxiosError) {
          toast.error("Error", {
            description: err.response?.data?.message || "Something went wrong",
          });
        } else {
          toast.error("Error", { description: "Something went wrong" });
        }
      },
    }
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full space-y-8 max-w-md p-6">
        <div className="">
          <Image src={exciteLoginLogo} alt="loginLogo" className="mx-auto" />

          {/*  <div className="text-center space-y-1">
            <h1 className="text-3xl font-semibold">Sign in</h1>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary">
                Join Excite enterprise for free
              </Link>
            </p>
          </div> */}
          <div className="text-center space-y-3">
            <h1 className="text-[#101828] font-semibold text-3xl">
              Log in to your account
            </h1>
            <p className="text-base text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-primary">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="not-focus:text-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-primary">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="not-focus:text-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox className="mr-2 border-secondary" />
                <span className="inline-block text-[0.675rem] text-secondary">
                  Remember me for 30 days
                </span>
              </div>
              <Link
                href="/forgot-password"
                className="text-primary text-[0.675rem]"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="mt-2 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>

            {/* <p className="text-sm">
                By creating an account, you agree to Excite Trade’s{" "}
                <Link href="/terms-of-service" className="text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-primary">
                  Privacy Policy
                </Link>
                .
              </p> */}
          </form>
        </Form>
        {/* </div> */}
      </div>
    </div>
  );
}
