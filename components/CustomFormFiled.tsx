"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { E164Number } from "libphonenumber-js/core";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FromFieldType } from "./forms/PatientForm";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FromFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (filed: any) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch (fieldType) {
    case FromFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={28}
              height={28}
              alt={iconAlt || "Icons ALT"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FromFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <PhoneInput
              defaultCountry="BD"
              placeholder={placeholder}
              international
              withCOuntryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        </div>
      );
    default:
      break;
  }
};

const CustomFormFiled = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FromFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormFiled;
