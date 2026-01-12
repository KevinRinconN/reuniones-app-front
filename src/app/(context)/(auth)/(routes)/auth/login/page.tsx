import { Button } from "@/shared/components/ui/button";
import {
  FormLogin,
  FormLoginEmailField,
  FormLoginErrorMessage,
  FormLoginPasswordField,
} from "../../../components/form-login";
import { ROUTES } from "@/shared/routes/admin.routes";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-end bg-muted  text-white m-4 rounded-xl overflow-hidden"
        style={{
          backgroundImage: "url('/bg-auth-admin.jpg')",
        }}
      >
        <div className="relative px-6 pt-24 pb-8">
          <div className="absolute inset-0 backdrop-blur-md mask-t-from-70% mask-t-to-100%" />
          <div className="relative flex flex-col justify-between h-full"></div>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="w-1/2 flex flex-col justify-center items-center px-16">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <img src="/logo.webp" alt="Logo app" className="h-16" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">
            ¡Bienvenido a App!
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Accede a tu CRM y lleva el registro y control total de la empresa.
          </p>
          <FormLogin redirectTo={ROUTES.ADMIN.DASHBOARD}>
            <FormLoginEmailField />
            <FormLoginPasswordField />
            <FormLoginErrorMessage />
            <div className="flex justify-end mb-6">
              <a href="#" className="text-sm  hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full py-2 rounded-full"
            >
              Iniciar Sesión
            </Button>
          </FormLogin>
        </div>
      </div>
    </div>
  );
}
