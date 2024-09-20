import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

const HomePageOfAppointment = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            width={1000}
            height={1000}
            src={"/assets/icons/logo-full.svg"}
            alt="Website Logo"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />
          
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @ 2024 CarePuls
            </p>
            <Link href={"/?admin===true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default HomePageOfAppointment;
