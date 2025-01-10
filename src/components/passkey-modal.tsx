"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { encryptKey } from "@/lib/utils";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedPasskey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    if (
      path.includes("admin") &&
      passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY
    ) {
      setOpen(true);
      router.push("/admin");
    } else {
      setOpen(true);
    }
  }, [encryptedPasskey]);

  const cancelModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedPasskey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedPasskey);
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              height={24}
              width={24}
              className="size-5 cursor-pointer"
              alt="Close"
              onClick={cancelModal}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin dashboard, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            value={passkey}
            onChange={(value) => setPasskey(value)}
            maxLength={6}
          >
            <InputOTPGroup className={`shad-otp gap-[10px]`}>
              <InputOTPSlot
                className={`shad-otp-slot  ${error ? "error" : ""}`}
                index={0}
              />
              <InputOTPSlot
                className={`shad-otp-slot  ${error ? "error" : ""}`}
                index={1}
              />
              <InputOTPSlot
                className={`shad-otp-slot  ${error ? "error" : ""}`}
                index={2}
              />
              <InputOTPSlot
                className={`shad-otp-slot  ${error ? "error" : ""}`}
                index={3}
              />
              <InputOTPSlot
                className={`shad-otp-slot  ${error ? "error" : ""}`}
                index={4}
              />
              <InputOTPSlot
                className={`shad-otp-slot  ${error ? "error" : ""}`}
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <div className="text-red-500 text-sm text-center mt-4">{error}</div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-primary-btn"
            onClick={(e) => validatePasskey(e)}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
