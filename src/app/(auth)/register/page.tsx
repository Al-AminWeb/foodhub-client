import {RegisterForm} from "@/modules/auth/RegisterForm";


export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4 py-8">
            <RegisterForm />
        </div>
    );
}