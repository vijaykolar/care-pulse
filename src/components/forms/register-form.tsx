"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "../ui/form";
import { CustomFormField } from "./custom-form-field";
import { FormFieldType } from "./types";
import {
  PatientRegisterValidation,
  UserFormValidation,
} from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "../../../constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FileUploader } from "../file-uploader";
import { registerPatient } from "@/lib/actions/patient.actions";

export const RegisterForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientRegisterValidation>>({
    resolver: zodResolver(PatientRegisterValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientRegisterValidation>) {
    // Do something with the form values.
    console.log(values);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <>
      <section className="mb-12 space-y-2">
        <h1 className="header">Welcome {user?.name || ""}👋</h1>
        <p className="text-dark-700">Let us know more about yourself</p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* Personal Information */}
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
            {/* Medical Information */}
            <section className="space-y-4">
              <h2 className="sub-header">Medical Information </h2>
              <div>
                <CustomFormField
                  control={form?.control}
                  name="primaryPhysician"
                  fieldType={FormFieldType.SELECT}
                  label="Primary care physician"
                  placeholder="Select a physician"
                >
                  {Doctors.map((doctor, i) => (
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
                </CustomFormField>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <CustomFormField
                    control={form?.control}
                    placeholder="Acko"
                    name="insuranceProvider"
                    fieldType={FormFieldType.INPUT}
                    label="Insurance Provider"
                  />
                </div>
                <div className="flex-1">
                  <CustomFormField
                    control={form?.control}
                    name="insurancePolicyNumber"
                    fieldType={FormFieldType.INPUT}
                    label="Insurance policy number"
                    placeholder="XX12345MY"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <CustomFormField
                    control={form?.control}
                    placeholder="ex: Peanuts, Penicillin, Pollen"
                    name="allergies"
                    fieldType={FormFieldType.TEXTAREA}
                    label="Allergies (if any)"
                  />
                </div>
                <div className="flex-1">
                  <CustomFormField
                    control={form?.control}
                    name="currentMedication"
                    placeholder="ex: Crocin, Paracetamol"
                    fieldType={FormFieldType.TEXTAREA}
                    label="Current medications"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <CustomFormField
                    control={form?.control}
                    placeholder="ex: Mother had breast cancer"
                    name="familyMedicalHistory"
                    fieldType={FormFieldType.TEXTAREA}
                    label="Family medical history (if relevant)"
                  />
                </div>
                <div className="flex-1">
                  <CustomFormField
                    control={form?.control}
                    name="pastMedicalHistory"
                    placeholder="ex: Asthma diagnosis in childhood"
                    fieldType={FormFieldType.TEXTAREA}
                    label="Past medical history"
                  />
                </div>
              </div>
            </section>
            {/* Identification and Verification */}
            <section className="space-y-4">
              <h2 className="sub-header">Identification and Verification</h2>
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="identificationType"
                  label="Identification Type"
                  placeholder="Select identification type"
                >
                  {IdentificationTypes.map((type, i) => (
                    <SelectItem key={type + i} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </CustomFormField>
                <CustomFormField
                  control={form?.control}
                  name="identificationNumber"
                  placeholder="ex: DL23YKXX56"
                  fieldType={FormFieldType.INPUT}
                  label="Identification Number"
                />
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="identificationDocument"
                  label="Scanned Copy of Identification Document"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <FileUploader
                        files={(field as any)?.value}
                        onChange={(field as any)?.onChange}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </section>
            {/* Consent and Privacy */}
            <section className="space-y-4">
              <h2 className="sub-header">Consent and Privacy</h2>
              <div className="space-y-4">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form?.control}
                  name="treatmentConsent"
                  label="I consent to receive treatment for my health condition."
                />

                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form?.control}
                  name="disclosureConsent"
                  label="I consent to the use and disclosure of my health information for treatment purposes."
                />

                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form?.control}
                  name="privacyConsent"
                  label="I acknowledge that I have reviewed and agree to the privacy policy"
                />
              </div>
            </section>
            {/* Submit Button */}
            <section className="pt-5">
              <SubmitButton isLoading={isLoading}>
                Submit and Continue
              </SubmitButton>
            </section>
          </div>
        </form>
      </Form>
    </>
  );
};
