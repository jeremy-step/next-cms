import { FormState } from "../definitions";

export interface PageFormState extends FormState {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
}

export interface PageMetaDataFormState extends FormState {
  errors?: {
    title?: string[];
    description?: string[];
    permalink?: string[];
  };
  message?: string | null;
}
