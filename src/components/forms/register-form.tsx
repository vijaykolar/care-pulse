"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "../ui/form";
import { CustomFormField } from "./custom-form-field";
import { FormFieldType } from "./types";
import { UserFormValidation } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "../../../constants";
import { Label } from "../ui/label";

export const RegisterForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      //   birthDate: new Date(),
      //   gender: "Male",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    console.log(values);

    // setIsLoading(true);
    // const { name, email, phone } = values;
    // try {
    //   const user = {
    //     name,
    //     email,
    //     phone,
    //   };

    //   const newUser = await createUser(user);

    //   if (newUser) {
    //     router.push(`/patients/${newUser.$id}/register`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // setIsLoading(false);
  }

  return (
    <>
      <section className="mb-12 space-y-2">
        <h1 className="header">Welcome👋</h1>
        <p className="text-dark-700">Let us know more about yourself</p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="sub-header">Personal Information</h2>
              <div className="space-y-6">
                <div>
                  <CustomFormField
                    control={form?.control}
                    placeholder="ex: John"
                    name="name"
                    fieldType={FormFieldType.INPUT}
                    label="Full Name"
                  />
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <CustomFormField
                      control={form?.control}
                      placeholder="name@test.com"
                      name="email"
                      fieldType={FormFieldType.INPUT}
                      iconSrc="/assets/icons/email.svg"
                      iconAlt="Main Icon"
                      label="Email address"
                    />
                  </div>
                  <div className="flex-1">
                    <CustomFormField
                      control={form?.control}
                      placeholder="+91 123 456 7890"
                      name="phone"
                      fieldType={FormFieldType.PHONE_INPUT}
                      label="Phone number"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row ">
                  <div className="flex-1">
                    <CustomFormField
                      fieldType={FormFieldType.DATE_PICKER}
                      name="birthDate"
                      label="Date of Birth"
                      control={form?.control}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="flex-1">
                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form?.control}
                      name="gender"
                      label="Gender"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <RadioGroup
                            className="flex h-[46px] gap-2 xl:justify-between"
                            onValueChange={(field as any).onChange}
                            defaultValue={(field as any).value}
                          >
                            {GenderOptions.map((option, i) => (
                              <div key={option + i} className="radio-group">
                                <RadioGroupItem value={option} id={option} />
                                <Label
                                  htmlFor={option}
                                  className="cursor-pointer"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <CustomFormField
                      control={form?.control}
                      placeholder="Karnataka, India"
                      name="address"
                      fieldType={FormFieldType.INPUT}
                      label="Address"
                    />
                  </div>
                  <div className="flex-1">
                    <CustomFormField
                      control={form?.control}
                      placeholder="Software Engineer"
                      name="occupation"
                      fieldType={FormFieldType.INPUT}
                      label="Occupation"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <CustomFormField
                      control={form?.control}
                      placeholder="Guardian's name"
                      name="emergencyContactName"
                      fieldType={FormFieldType.INPUT}
                      label="Emergency contact name"
                    />
                  </div>
                  <div className="flex-1">
                    <CustomFormField
                      control={form?.control}
                      name="emergencyContactNumber"
                      fieldType={FormFieldType.PHONE_INPUT}
                      label="Emergency contact number"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="sub-header">Medical Information </h2>
              <div>form</div>
            </section>
            <section>
              <h2 className="sub-header">Identification and Verification</h2>
            </section>
            <section>
              <h2 className="sub-header">Consent and Privacy</h2>
            </section>
          </div>
          <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
        </form>
      </Form>
    </>
  );
};
