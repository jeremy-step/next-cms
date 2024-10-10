"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  diffSourcePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  DiffSourceToggleWrapper,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  ListsToggle,
  linkPlugin,
  imagePlugin,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="light-editor dark:dark-editor"
      contentEditableClassName="mdxeditor-focus form-textarea prose dark:prose-invert max-w-none min-h-72 py-4 px-3 rounded-md border bg-slate-100 !border-slate-300 dark:bg-slate-900 dark:!border-slate-700 !ring-0 outline-2 focus:outline-sky-500 focus:outline-offset-0 [&_ul]:list-[square] [&_ul_ul]:list-disc [&_ul_ul_ul]:list-[circle] [&_ul>li[role='checkbox']]:!ps-6 before:[&_ul>li[role='checkbox']]:!top-1/2 before:[&_ul>li[role='checkbox']]:!-translate-y-1/2 after:[&_ul>li[role='checkbox']]:!top-1/2 after:[&_ul>li[role='checkbox']]:!-translate-y-1/2 after:[&_ul>li[role='checkbox']]:!rotate-45 [&[contenteditable]+*]:!bg-transparent"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        imagePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin({
          diffMarkdown: undefined,
          viewMode: "rich-text",
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <DiffSourceToggleWrapper>
                <UndoRedo />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
