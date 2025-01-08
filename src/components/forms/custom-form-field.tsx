"use client";

import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CustomFormFieldProps, FormFieldType } from "./types";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

const RenderField = ({
  field,
  props,
}: {
  field: ControllerRenderProps<any, string>;
  props: CustomFormFieldProps;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    // case FormFieldType.password:
    //   return (
    //     <div className="flex rounded-md border border-dark-500 bg-dark-400">
    //       {props.iconSrc && (
    //         <Image
    //           src={props.iconSrc}
    //           height={24}
    //           width={24}
    //           alt={props.iconAlt || "icon"}
    //           className="ml-2"
    //         />
    //       )}
    //       <FormControl>
    //         <Input
    //           placeholder={props.placeholder}
    //           {...field}
    //           type="password"
    //           className="shad-input border-0"
    //         />
    //       </FormControl>
    //     </div>
    //   );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"

            // limitMaxLength={true}
            // countries={["IN"]}
            // limitMaxLength={true}
            // locales={"en-IN"}
            // rules={{ required: "Phone number is required" }}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    // case FormFieldType.DATE_PICKER:
    //   return (
    //     <div className="flex rounded-md border border-dark-500 bg-dark-400">
    //       <Image
    //         src="/assets/icons/calendar.svg"
    //         height={24}
    //         width={24}
    //         alt="user"
    //         className="ml-2"
    //       />
    //       <FormControl>
    //         <ReactDatePicker
    //           showTimeSelect={props.showTimeSelect ?? false}
    //           selected={field.value}
    //           onChange={(date: Date) => field.onChange(date)}
    //           timeInputLabel="Time:"
    //           dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
    //           wrapperClassName="date-picker"
    //         />
    //       </FormControl>
    //     </div>
    //   );
    // case FormFieldType.SELECT:
    //   return (
    //     <FormControl>
    //       <Select onValueChange={field.onChange} defaultValue={field.value}>
    //         <FormControl>
    //           <SelectTrigger className="shad-select-trigger">
    //             <SelectValue placeholder={props.placeholder} />
    //           </SelectTrigger>
    //         </FormControl>
    //         <SelectContent className="shad-select-content">
    //           {props.children}
    //         </SelectContent>
    //       </Select>
    //     </FormControl>
    //   );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

export const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, label, name, fieldType } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name!}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel className="shad-input-label">{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            {/* <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl> */}
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </div>
  );
};
