"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { CustomFormField } from "./custom-form-field";
import { FormFieldType } from "./types";
import { UserFormValidation } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { createUser } from "@/lib/actions/patient.actions";

export const RegisterForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    setIsLoading(true);
    const { name, email, phone } = values;
    try {
      const user = {
        name,
        email,
        phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
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
              <div className="space-y-4">
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
                <div className="flex flex-col gap-4 md:flex-row">
                  <div>date picker</div>
                  <div>radio button</div>
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
