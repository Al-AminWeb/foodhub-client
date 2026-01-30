import {LoginForm} from "@/modules/auth/LoginForm";


export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
            <LoginForm />
        </div>
    );
}