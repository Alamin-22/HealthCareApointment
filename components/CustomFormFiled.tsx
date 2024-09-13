"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FromFieldType } from "./forms/PatientForm";

interface CustomProps {
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FromFieldType;
  name: string;
  
}

const CustomFormFiled = ({ control, fieldType, name }: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FromFieldType.CHECKBOX &&
            label(<FormLabel>{label}</FormLabel>)}
        </FormItem>
      )}
    />
  );
};

export default CustomFormFiled;
