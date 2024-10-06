"use client";

import { createPage, PageFormState } from "@lib/actions/ControlPanel/pages";
import InputField from "../../forms/InputField";
import { useFormState } from "react-dom";
import MDXEditorField from "../../forms/MDXEditorField";

export default function PageForm({ ...props }) {
  const initialState: PageFormState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createPage, initialState);

  return (
    <form {...props} className="grid gap-5 mt-5" action={formAction}>
      <InputField name="title" label="Title" state={state} />
      <MDXEditorField name="content" label="Content" state={state} />
      <button>Submit</button>
    </form>
  );
}
