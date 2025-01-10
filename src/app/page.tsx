import PatientForm from "@/components/forms/patient-form";
import { PasskeyModal } from "@/components/passkey-modal";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const { admin } = await searchParams;

  const isAdmin = admin === "true";
  console.log(isAdmin);

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="Patient Care"
              className="h-10 mb-12 w-fit"
            />
          </Link>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="text-dark-600 justify-items-end xl:text-left">
              &copy; {new Date().getFullYear()} Care Pulse.
            </p>
            <Link className="text-green-500" href="/?admin=true">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        height={1000}
        width={1000}
        src={"/assets/images/onboarding-img.png"}
        alt="Patient Care"
        className="max-w-[50%] object-cover hidden md:block h-full"
      />
    </div>
  );
}
