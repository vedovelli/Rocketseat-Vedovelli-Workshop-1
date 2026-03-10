import { createContext } from "react";

export type FormFieldContextValue = {
  name: string;
  error?: string;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);
