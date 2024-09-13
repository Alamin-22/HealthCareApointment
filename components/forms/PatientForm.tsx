"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormFiled from "../CustomFormFiled";

export enum FromFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi, There 👋👋</h1>
            <p className="text-dark-700">Schedule Your First Appointment</p>
          </section>
          {/* form name */}
          <CustomFormFiled
            fieldType={FromFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Your Name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          {/* email */}
          <CustomFormFiled
            fieldType={FromFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          {/* number */}
          <CustomFormFiled
            fieldType={FromFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+880 123456789"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
