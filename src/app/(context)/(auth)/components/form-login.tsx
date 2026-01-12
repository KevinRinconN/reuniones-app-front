"use client";
import { createContext, useContext, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { IconWrapper } from "@/shared/components/icon/icon-wrapper";
import { AuthStatus } from "../types/auth.types";
import { authenticate } from "../actions/authenticate";

/* -----------------------------
 * SCHEMA
 * ----------------------------- */
const loginSchema = z.object({
  email: z.email({ message: "Correo electrónico inválido" }),
  password: z.string(),
});
type LoginSchema = z.infer<typeof loginSchema>;

/* -----------------------------
 * CONTEXT
 * ----------------------------- */
const FormLoginContext = createContext<{ state: AuthStatus }>({
  state: "Pending",
});

export const useFormLogin = () => useContext(FormLoginContext);

/* -----------------------------
 * MAIN FORM
 * ----------------------------- */
export const FormLogin = ({
  onSubmit,
  redirectTo,
  children,
}: {
  onSubmit?: (data: LoginSchema) => void;
  redirectTo?: string;
  children: React.ReactNode;
}) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [state, setState] = useState<AuthStatus>("Pending");
  const router = useRouter();

  const onHandleSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const res: AuthStatus = await authenticate(data);
    if (res === "Success") {
      onSubmit?.(data);
      if (redirectTo) {
        router.push(redirectTo);
      }
    }
    setState(res);
  };

  return (
    <FormLoginContext.Provider value={{ state }}>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-4"
          >
            {children}
          </form>
        </Form>
      </FormProvider>
    </FormLoginContext.Provider>
  );
};

/* -----------------------------
 *   SUBCOMPONENTS
 * ----------------------------- */
export const FormLoginEmailField = () => {
  const { control } = useFormContext<LoginSchema>();
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">Correo electrónico</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              autoComplete="email"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormLoginPasswordField = () => {
  const { control } = useFormContext<LoginSchema>();
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">Contraseña</FormLabel>
          <FormControl>
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="*******"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/* -----------------------------
 * ERROR MESSAGE COMPONENT
 * ----------------------------- */
export const FormLoginErrorMessage = () => {
  const { state } = useFormLogin();

  if (state !== "Invalid credentials") return null;

  return (
    <div className="flex items-center gap-2">
      <IconWrapper icon="info" className="text-destructive" />
      <p className="text-sm text-destructive">Credenciales no son correctas</p>
    </div>
  );
};
