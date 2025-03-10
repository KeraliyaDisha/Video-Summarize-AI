import { SigninForm } from "@/components/forms/SignInForm";

export default function SingInRoute() {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
       <SigninForm />
     </div>
   );
}