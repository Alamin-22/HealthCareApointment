import StatCard from "@/components/StatCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminPage = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibolod">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4 ">
          <h1 className="header"> Welcome 👋👋</h1>
          <p className="text-dark-700">
            Start The Day With Managing New Appointment
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type={"appointments"}
            count={5}
            label="Schedule Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type={"pending"}
            count={10}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type={"cancelled"}
            count={2}
            label="Canceled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
