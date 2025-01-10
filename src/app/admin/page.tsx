import { StatCard } from "@/components/stat-card";
import Image from "next/image";
import Link from "next/link";
// import React from "react";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";

export default async function AdminPage() {
  const appointments = await getRecentAppointmentList();
  return (
    <div className="mx-auto flex max-w-7xl space-y-14 flex-col">
      <header className="admin-header ">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Care pulse"
            height={24}
            width={32}
            className="h-8 w-fit"
          />
        </Link>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome👋</h1>
          <p className=" text-dark-700">
            Start day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
}
