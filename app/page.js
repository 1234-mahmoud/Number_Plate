import Image from "next/image";
import RegestrationForm from '../components/RegestrationForm'
import VehicleLookup from "@/components/VehicleLookup";
import HomeComp from "@/components/HomeComp";
export default function Home() {
  return (
    <div className="">
     {/* <RegestrationForm/>
     <VehicleLookup/> */}
     <HomeComp/>
    </div>
  );
}
