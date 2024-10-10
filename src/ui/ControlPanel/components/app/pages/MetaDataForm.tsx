"use client";

import { editPageMetaData } from "@lib/actions/ControlPanel/pages";
import InputField from "../../forms/InputField";
import ControlButtons from "../../forms/ControlButtons";
import TextareaField from "../../forms/TextareaField";
import { PageMetaDataFormState } from "@lib/actions/ControlPanel/definitions";
import { useEffect, useRef, useState } from "react";
import { PageMetaData } from "@lib/data/ControlPanel/definitions";
import SwitchBoxField from "../../forms/SwitchBoxField";
import { SitemapChangeFreq, SitemapInclude, SitemapPrio } from "@lib/prisma/db";
import SelectField from "../../forms/SelectField";
import Heading3 from "../../Heading3";
import {
  getRobots,
  getSitemapChangeFreq,
  getSitemapPrio,
} from "@lib/utils/metadata";

interface FormProps extends React.HtmlHTMLAttributes<HTMLFormElement> {
  data?: PageMetaData;
  pageTitle: string;
  mode?: "create" | "edit";
  permalink: string;
  setPermalink: CallableFunction;
  formatPermalink: CallableFunction;
}

export default function MetaDataForm({
  data = null,
  pageTitle,
  mode = "create",
  permalink,
  setPermalink,
  formatPermalink,
  ...rest
}: FormProps) {
  const action = editPageMetaData.bind(null, (data?.id ?? NaN) as number);
  const initialState: PageMetaDataFormState = { message: null, errors: {} };
  const [state, setState] = useState(initialState);

  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const createPermalink = async () => {
      const permalink = await formatPermalink(pageTitle, false);

      setPermalink(permalink);
    };

    createPermalink();
  }, [pageTitle, formatPermalink, setPermalink]);

  const handleSubmit = async (formData: FormData) => {
    const result = await action(initialState, formData);

    setState(result ?? {});
  };

  const handleFormatPermalink = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.target.value = await formatPermalink(e.target.value, true);
  };

  const [sitemapInclude, setSitemapInclude] = useState(
    data?.sitemapInclude === SitemapInclude.Yes
  );

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
        defaultValue={mode === "create" ? pageTitle : data?.title}
        disabled={!data}
      />
      <InputField
        name="permalink"
        label="Permalink"
        state={state}
        defaultValue={mode === "create" ? permalink : data?.permalink}
        disabled={!data}
        onBlur={handleFormatPermalink}
      />
      <TextareaField
        name="description"
        label="Description"
        state={state}
        defaultValue={data?.description ?? ""}
        disabled={!data}
      />
      <Heading3 className="mb-0">Indexing</Heading3>
      <SelectField
        name="robots"
        label="Robots"
        state={state}
        disabled={!data}
        options={getRobots()}
        defaultValue={data?.robots}
      />
      <SwitchBoxField
        name="sitemapInclude"
        label="Include in sitemap"
        title="Sitemap"
        state={state}
        defaultChecked={
          mode === "create" ? true : data?.sitemapInclude === SitemapInclude.Yes
        }
        disabled={!data}
        onChange={(e) => setSitemapInclude(e.target.checked)}
      />
      <SelectField
        name="sitemapPrio"
        label="Priority"
        state={state}
        disabled={!data || !sitemapInclude}
        options={getSitemapPrio()}
        defaultValue={mode === "create" ? SitemapPrio.P70 : data?.sitemapPrio}
      />
      <SelectField
        name="sitemapChangeFreq"
        label="Change Frequency"
        state={state}
        disabled={!data || !sitemapInclude}
        options={getSitemapChangeFreq()}
        defaultValue={
          mode === "create"
            ? SitemapChangeFreq.Monthly
            : data?.sitemapChangeFreq
        }
      />
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
