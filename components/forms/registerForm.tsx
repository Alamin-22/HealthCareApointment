"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormFiled from "../CustomFormFiled";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import UserFormValidation from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FromFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);
      console.log(user);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          <section className=" space-y-4">
            <h1 className="header">Welcome👋👋</h1>
            <p className="text-dark-700">Let Us Know More About YourSelf.</p>
          </section>
          <section className=" space-y-6">
            <div className="mb-9 space-y-1"></div>
            <h2 className="sub-header">Personal Information</h2>
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
          <div className="flex flex-col gap-6 xl:flex-row">
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
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            {/* date  */}
            <CustomFormFiled
              fieldType={FromFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date Of Birth"
            />
            {/* number */}
            <CustomFormFiled
              fieldType={FromFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(filed) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={filed.onChange}
                    defaultValue={filed.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option}>
                          <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </RadioGroupItem>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
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
          </div>
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
