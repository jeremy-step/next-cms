"use client";

import { editPageMetaData } from "@lib/actions/ControlPanel/pages";
import InputField from "../../forms/InputField";
import ControlButtons from "../../forms/ControlButtons";
import TextareaField from "../../forms/TextareaField";
import slugify from "slugify";
import { PageMetaDataFormState } from "@lib/actions/ControlPanel/definitions";
import { useEffect, useRef, useState } from "react";
import { getLink } from "@lib/utils/router";
import { PageMetaData } from "@lib/data/ControlPanel/definitions";

interface FormProps extends React.HtmlHTMLAttributes<HTMLFormElement> {
  data?: PageMetaData;
  pageMetaData: string;
  mode?: "create" | "edit";
}

export default function MetaDataForm({
  data = null,
  pageMetaData,
  mode = "create",
  ...rest
}: FormProps) {
  const action = editPageMetaData.bind(null, (data?.id ?? NaN) as number);
  const initialState: PageMetaDataFormState = { message: null, errors: {} };
  const [state, setState] = useState(initialState);

  const form = useRef<HTMLFormElement>(null);

  const [permalink, setPermalink] = useState("");

  useEffect(() => {
    setPermalink(
      `/${slugify(pageMetaData, {
        lower: true,
        trim: true,
        remove: /[^\w\s$*_+~.()'"!\-:@]+/g,
      })}`
    );
  }, [pageMetaData]);

  const handleSubmit = async (formData: FormData) => {
    const result = await action(initialState, formData);

    setState(result);

    if (!result.errors) {
      form.current?.reset();
    }
  };

  return (
    <form
      ref={form}
      {...rest}
      className="grid gap-5"
      action={handleSubmit}
      noValidate
    >
      {!data && (
        <p className="italic">
          <small>Becomes editable once page is created</small>
        </p>
      )}
      <InputField
        name="title"
        label="Title"
        state={state}
        defaultValue={mode === "create" ? pageMetaData : data?.title}
        disabled={!data}
      />
      <InputField
        name="permalink"
        label="Permalink"
        state={state}
        defaultValue={mode === "create" ? permalink : data?.permalink}
        disabled={!data}
      />
      <TextareaField
        name="description"
        label="Description"
        state={state}
        defaultValue={data?.description ?? ""}
        disabled={!data}
      />
      Index, Sitemap settings
      {mode === "edit" && (
        <ControlButtons
          form={form}
          type="edit"
          label="Data"
          setState={setState}
          controls={["primary", "cancel"]}
        />
      )}
    </form>
  );
}
