import Image from "next/image";
import RegestrationForm from '../components/ResidentRegestrationForm'
import VehicleLookup from "@/components/VehicleLookup";
import HomeComp from "@/components/HomeComp";
import LandingPageComp from "@/components/LandingPageComp";
export default function Home() {
  return (
    <div className="">
     {/* <RegestrationForm/>
     <VehicleLookup/> */}
     {/* <HomeComp/> */}
     <LandingPageComp/>
    </div>
  );
}
