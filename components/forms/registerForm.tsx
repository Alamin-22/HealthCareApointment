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
import { Label } from "../ui/label";
import { Doctors, GenderOptions } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          {/* email and Number */}
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
            {/* gender */}
            <CustomFormFiled
              fieldType={FromFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          {/* occupation and address */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFiled
              fieldType={FromFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="Your current Address"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormFiled
              fieldType={FromFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="software Engineer"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>
          {/*  emergency COntact row*/}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFiled
              fieldType={FromFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Guardian's Name"
            />
            {/*Emergency  number */}
            <CustomFormFiled
              fieldType={FromFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="+880 123456789"
            />
          </div>
          <section className=" space-y-6">
            <div className="mb-9 space-y-1"></div>
            <h2 className="sub-header">Medical Information</h2>
          </section>

          <CustomFormFiled
            fieldType={FromFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="select a Physician"
          >
            {Doctors?.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormFiled>

          {/* insurance  */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFiled
              fieldType={FromFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross  BlueShield"
            />
            <CustomFormFiled
              fieldType={FromFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="A77B465C123D1315"
            />
          </div>
          {/* allergies  */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFiled
              fieldType={FromFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, tec.."
            />
            <CustomFormFiled
              fieldType={FromFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Paracetamol 500mg, Sergel 20mg"
            />
          </div>
          {/* Family Medical history  */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFiled
              fieldType={FromFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Mother had brain cancer and father had heart disease"
            />
            <CustomFormFiled
              fieldType={FromFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="Appendectomy"
            />
          </div>

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
