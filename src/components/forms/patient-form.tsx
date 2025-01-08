"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { CustomFormField } from "./custom-form-field";
import { FormFieldType } from "./types";
import { formSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const PatientForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    router.push("/success");
    console.log(values);
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
            // label="Full Name"
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
            // label="Email Address"
            placeholder="Enter your email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email Icon"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form?.control}
            name="phone"
            // label="Email Address"
            placeholder="Enter your phone number"
          />
          {/* <CustomFormField
            control={form?.control}
            label="Password"
            placeholder="d"
            name="password"
            fieldType={FormFieldType.password}
            iconSrc="/assets/icons/user.svg"
            iconAlt="User Icon"
          /> */}
          {/* <CustomFormField
            control={form?.control}
            label="Password"
            placeholder="password"
            name="password"
            fieldType={FormFieldType.TEXTAREA}
          /> */}
          {/* <CustomFormField
          control={form?.control}
          label="Password"
          placeholder="password"
          name="password"
          fieldType={FormFieldType.SKELETON}
          //   type="password"
        /> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default PatientForm;
