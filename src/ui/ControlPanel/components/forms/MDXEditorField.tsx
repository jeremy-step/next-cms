"use client";

import { FormState } from "@lib/actions/definitions";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { FocusEvent, useEffect, useId, useRef, useState } from "react";
import { MDXEditor } from "../MDXEditor";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  markdown?: string;
  state: FormState;
  reset: boolean;
  setReset: CallableFunction;
}

export default function MDXEditorField({
  label,
  name,
  markdown = "",
  state,
  reset,
  setReset,
  className,
  ...rest
}: FieldProps) {
  const id = useId();

  const contentRef = useRef<MDXEditorMethods>(null);

  const [content, setContent] = useState(markdown);

  const handleChange = (markdown: string) => {
    setContent(markdown);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    const editor = (e.target.nextSibling as HTMLElement)?.querySelector(
      ".mdxeditor-focus"
    ) as HTMLElement;

    editor?.focus();

    // Place cursor at the end of the editor area
    const range = document.createRange();

    range.selectNodeContents(editor);
    range.collapse(false);

    const sel = window.getSelection();

    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }

    contentRef.current?.setMarkdown(markdown);
    setContent(markdown);
  }, [reset, markdown, setReset]);

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <textarea
          id={id}
          name={name}
          value={content}
          readOnly
          aria-describedby={`${id}-error`}
          className="sr-only whitespace-pre"
          onFocus={handleFocus}
        />
        <MDXEditor
          markdown={markdown}
          ref={contentRef}
          // @ts-expect-error: parameter types don't match
          onChange={handleChange}
          autoFocus={{ defaultSelection: "rootEnd", preventScroll: true }}
          {...rest}
        />
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {state?.errors &&
            state.errors[name] &&
            state.errors[name].map((error, index) => (
              <p className="mt-2 text-sm text-red-500" key={index}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
