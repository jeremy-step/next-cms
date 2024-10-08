"use client";

import {
  createPage,
  deletePage,
  editPage,
} from "@lib/actions/ControlPanel/pages";
import InputField from "../../forms/InputField";
import MDXEditorField from "../../forms/MDXEditorField";
import ControlButtons from "../../forms/ControlButtons";
import { getLink } from "@lib/utils/router";
import { PageFormState } from "@lib/actions/ControlPanel/definitions";
import { useRef, useState } from "react";
import { Page } from "@lib/data/ControlPanel/definitions";

interface FormProps extends React.HtmlHTMLAttributes<HTMLFormElement> {
  data?: Page;
  mode?: "create" | "edit";
  setPageMetaData: CallableFunction;
}

export default function PageForm({
  data = {
    id: null,
    title: "",
    content: null,
    published: false,
    metadata: null,
  },
  mode = "create",
  setPageMetaData,
  ...rest
}: FormProps) {
  const action =
    mode === "create" ? createPage : editPage.bind(null, data.id as string);
  const initialState: PageFormState = { message: null, errors: {} };
  const [state, setState] = useState(initialState);

  const handleSetPageMetaData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageMetaData(e.target.value);
  };

  const form = useRef<HTMLFormElement>(null);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const result = await action(initialState, formData);

    setState(result ?? {});

    if (!result?.errors) {
      form.current?.reset();
    }
  };

  const handleDelete = (id: string) => {
    return deletePage(id);
  };

  return (
    <form
      {...rest}
      className="grid gap-5"
      action={handleSubmit}
      noValidate
      ref={form}
      onReset={() => setReset(true)}
    >
      <InputField
        name="title"
        label="Title"
        state={state}
        defaultValue={data.title}
        onChange={mode === "create" ? handleSetPageMetaData : undefined}
        required
      />

      <MDXEditorField
        name="content"
        label="Content"
        state={state}
        markdown={data.content ?? ""}
        reset={reset}
        setReset={setReset}
      />

      <ControlButtons
        form={form}
        type={mode}
        label="Page"
        setState={setState}
        cancelLink={mode === "create" ? getLink("cp.pages/index") : undefined}
        onDelete={() => handleDelete(data.id as string)}
      />
    </form>
  );
}
