import * as React from "react";
import { LuGraduationCap } from "react-icons/lu";

export default function SwipeableTemporaryDrawer() {
  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
  });
  console.log({...formData});
  console.log(formData);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <div className="text-[50px]">Benifits From Our Online Learning</div>
        <div className="w-[91px] h-[91px] bg-blue-950 rounded-full flex items-center justify-center">
          <LuGraduationCap className="w-[68px] h-[60px] text-white" />
        </div>
      </div>
    </div>
  );
}
