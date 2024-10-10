"use client";

import {
  createPage,
  deletePage,
  editPage,
  setPublished,
} from "@lib/actions/ControlPanel/pages";
import InputField from "../../forms/InputField";
import MDXEditorField from "../../forms/MDXEditorField";
import ControlButtons from "../../forms/ControlButtons";
import { getLink } from "@lib/utils/router";
import { PageFormState } from "@lib/actions/ControlPanel/definitions";
import { useRef, useState } from "react";
import { Page } from "@lib/data/ControlPanel/definitions";
import SwitchBox from "../../SwitchBox";
import { getDate, getDateLegible } from "@lib/utils/strings";

interface FormProps extends React.HtmlHTMLAttributes<HTMLFormElement> {
  data?: Page;
  mode?: "create" | "edit";
  setPageTitle: CallableFunction;
  permalink: string;
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
  setPageTitle,
  permalink,
  ...rest
}: FormProps) {
  const action =
    mode === "create" ? createPage : editPage.bind(null, data.id as string);
  const initialState: PageFormState = { message: null, errors: {} };
  const [state, setState] = useState(initialState);

  const handlesetPageTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageTitle(e.target.value);
  };

  const form = useRef<HTMLFormElement>(null);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const result = await action(initialState, formData);

    setState(result ?? {});
  };

  const handleDelete = (id: string) => {
    return deletePage(id, true);
  };

  const handleSetPublished = async (
    e: React.MouseEvent<HTMLInputElement>,
    page: Page
  ) => {
    if (mode === "create") {
      return;
    }

    const input = e.target as HTMLInputElement;

    input.checked = !input.checked;
    input.disabled = true;

    await setPublished(!page.published, page.id as string);

    input.disabled = false;
    input.checked = !input.checked;

    input.focus();
  };

  return (
    <>
      {state.message && <p className="mb-5">{state.message}</p>}

      <div className="flex gap-2 items-center justify-between text-sm mb-5">
        <div className="flex gap-2 items-center">
          <SwitchBox
            label=""
            onClick={(e) => handleSetPublished(e, data)}
            defaultChecked={data?.published}
            disabled={mode === "create"}
          />
          <span className="font-semibold">Published</span>
        </div>
        <div className="flex gap-5">
          {mode === "edit" && (
            <>
              <div className="flex gap-2">
                <span className="font-semibold">Created: </span>{" "}
                <time dateTime={getDate(data?.createdAt as Date)}>
                  {getDateLegible(data?.createdAt as Date)}
                </time>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Updated: </span>{" "}
                {data?.updatedAt ? (
                  <time dateTime={getDate(data?.updatedAt as Date)}>
                    {getDateLegible(data?.updatedAt as Date)}
                  </time>
                ) : (
                  <span>Never</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <form
        {...rest}
        className="grid gap-5"
        action={handleSubmit}
        noValidate
        ref={form}
        onReset={() => setReset(true)}
      >
        {mode === "create" && (
          <input type="hidden" name="permalink" value={permalink} readOnly />
        )}

        <InputField
          name="title"
          label="Title"
          state={state}
          defaultValue={data.title}
          onBlur={mode === "create" ? handlesetPageTitle : undefined}
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
          onDelete={() => {
            if (confirm(`Delete "${data.title}"?`)) {
              handleDelete(data.id as string);
            }
          }}
        />
      </form>
    </>
  );
}
