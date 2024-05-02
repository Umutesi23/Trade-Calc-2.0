"use client";
import { nullable, number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


//IMPORTS
//DEFINE FORM INPUTS
const formSchema = z.object({

  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
    password: z.string()
});
export default function Login() {
const router = useRouter();
  //usestate


  //ZOD
  const lForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
const singInData= await signIn("credentials", {email: data.email, password: data.password, redirect:true})
//change pages
router.push("/tradeform")

}
  

  

  return (
    <div className="flex  flex-col items-center justify-between">
      <br></br>
      <br></br>

      <Form {...lForm}>

        <form onSubmit={lForm.handleSubmit(onSubmit)} className="space-y-8">
        <h1>LOGIN PAGE</h1>

          <FormField
            control={lForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={lForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br></br>
            <Button type="submit">Log In   
          </Button>
          <br></br>
          <br></br>
          <Link href="./signup">
            <Button>Register</Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}
