//IMPORTS
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
import Link from "next/link";
import { useState } from "react";
import { Table } from "lucide-react";
//DEFINE FORM INPUTS
const formSchema = z.object({
  size: z.string().transform((v) => Number(v)),
  entryprice: z.string().transform((v) => Number(v)),
  expectedROI: z.string().transform((v) => Number(v)),
  optprice: z.string().transform((v) => Number(v)),
});
//DEFAULT FUNCTION
export default function Formi() {
  const [cValues, setValues] = useState({
    s: 0,
    e: 0,
    er: 0,
    o: 0,
  });
  //DEFAULT VALUES FOR FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: 0,
      entryprice: 0,
      expectedROI: 0,
      optprice: 0,
    },
  });

  //MANIPULATE INPUT
  async function onSubmit(myinput: z.infer<typeof formSchema>) {
    setValues({
      s: myinput.size,
      e: myinput.entryprice,
      er: myinput.expectedROI,
      o: myinput.optprice,
    });
  }
  var oP = 0;
  var sz = 0;
  var eP = 0;
  var eR = 0;
  var iP = 0;
  var aP = 0;
  var cR = 0;

  oP = cValues.o;
  sz = cValues.s;
  eP = cValues.e;
  eR = cValues.er;
  iP = Math.floor(eP + eR / sz);
  aP = Math.floor((oP - iP) / 2 + eP);
  cR = Math.floor(((oP - iP) * 100) / oP / 2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* SIZE */}
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size (sz)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contracts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ENTRY PRICE */}

            <FormField
              control={form.control}
              name="entryprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Price (eP)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contract(s) price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MARKET PRICE */}

            <FormField
              control={form.control}
              name="expectedROI"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected ROI</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter return on ivestment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* OPTIMISTIC PRICE */}

            <FormField
              control={form.control}
              name="optprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optimistic price (op)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter optimistic price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <br></br>
        <br></br>
        {cValues.e !== 0 &&
          cValues.er !== 0 &&
          cValues.o !== 0 &&
          cValues.s !== 0 && (
            <table>
              <tr>
                <th className=" p-[1vw]">Ideal Profit</th>
                <th className=" p-[1vw]">Activation Price</th>
                <th className=" p-[1vw]">Callback Rate</th>
              </tr>
              <tr>
                <td className=" p-[1vw]">{iP}</td>
                <td className=" p-[1vw]">{aP}</td>
                <td className=" p-[1vw]">{cR.toFixed(2)}%</td>
              </tr>
            </table>
          )}
      </div>
    </main>
  );
}
