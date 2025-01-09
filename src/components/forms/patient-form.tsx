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

const PatientForm: React.FC = () => {
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
        <h1 className="header">Hi There👋</h1>
        <p className="text-dark-700">Schedule your appointment</p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            control={form?.control}
            placeholder="Enter your full name"
            name="name"
            fieldType={FormFieldType.INPUT}
            iconSrc="/assets/icons/user.svg"
            iconAlt="User Icon"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form?.control}
            name="email"
            placeholder="Enter your email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email Icon"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form?.control}
            name="phone"
            placeholder="Enter your phone number"
          />
          <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
        </form>
      </Form>
    </>
  );
};

export default PatientForm;
