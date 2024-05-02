
 



////////////////////////////////////////////////////////////

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

//IMPORTS
//DEFINE FORM INPUTS
const formSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Your name should be at least 4 charaxters" })
      .max(20, { message: "Your name should not be more than 20 charaxters" }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(4, { message: " Password should be at least 4 charaxters" }),
    confirmpassword: z
      .string()
      .min(4, { message: " Password should be at least 4 charaxters" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });
export default function Login() {
  const router= useRouter();
  //usestate


  //ZOD
  const sForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await fetch( "/api/user", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({username: data.name, email:data.email, password:data.password})})
    router.push("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Form {...sForm}>
          <form onSubmit={sForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={sForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sForm.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br></br>
              <Button type="submit">Sign Up</Button>
            <br></br> <br></br>
            <Link href="/">
              <Button> Log In</Button>
            </Link>
          </form>
        </Form>
      </div>
    </main>
  );
}
