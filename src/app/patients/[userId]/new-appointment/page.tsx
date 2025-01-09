import React from "react";

import Image from "next/image";
import Link from "next/link";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { AppointmentStatus } from "../../../../../types/appointment-status";
import { getPatient } from "@/lib/actions/patient.actions";

export default async function NewAppointment({ params }) {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="Patient Care"
              className="h-10 mb-12 w-fit"
            />
          </Link>
          <AppointmentForm
            type={AppointmentStatus.CREATE}
            userId={userId}
            patientId={patient.$id}
          />
          <div className="text-14-regular mt-20 flex justify-center">
            <p className="text-dark-600 justify-items-end xl:text-left">
              &copy; {new Date().getFullYear()} Care Pulse.
            </p>
          </div>
        </div>
      </section>
      <Image
        height={1000}
        width={1000}
        src={"/assets/images/appointment-img.png"}
        alt="Patient Care"
        className="max-w-[390px] object-cover hidden md:block h-full"
      />
    </div>
  );
}
