"use client";

import { createPage, PageFormState } from "@lib/actions/ControlPanel/pages";
import InputField from "../../forms/InputField";
import { MDXEditor } from "../../MDXEditor";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";

export default function PageForm({ ...props }) {
  const initialState: PageFormState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createPage, initialState);

  const contentRef = useRef<MDXEditorMethods>(null);

  const [content, setContent] = useState("");

  const handleSetContent = async () => {
    setContent(contentRef.current?.getMarkdown() ?? "");
  };

  return (
    <form {...props} className="grid gap-5 mt-5" action={formAction}>
      <InputField name="title" label="Title" state={state} />
      <MDXEditor markdown="" ref={contentRef} onChange={handleSetContent} />
      <input type="hidden" name="content" defaultValue={content} />
      <button>Submit</button>
    </form>
  );
}
