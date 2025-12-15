"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  header?: boolean;
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Tiptap = ({
  onChange,
  // content,
  className,
  placeholder,
  header = true,
  size = "md",
}: Props) => {
  const editor = useEditor({
    extensions: [
      // TextStyle.configure({})
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
      Image.configure({
        inline: true,
      }),
      Underline.configure(),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-900 underline",
        },
      }),
    ],
    immediatelyRender: false, // ✅ REQUIRED
    editorProps: {
      attributes: {
        class:
          "px-4 justify-start text-[#020817] items-start w-full min-h-[100px] pt-4 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const getHeight = () => {
    if (size === "sm") return "min-h-[100px] max-h-[300px] overflow-y-auto";
    if (size === "md") return "h-[250px] overflow-y-auto";
    if (size === "lg") return "min-h-[250px] max-h-[500px] overflow-y-auto";
  };

  return (
    <div
      className={`${className} relative border border-[#00000047] w-full ${getHeight()} rounded-sm focus:outline-none`}
    >
      {header && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={`${header && "pt-12"} w-full h-fit`}
        style={{ whiteSpace: "pre-line", textAlign: "justify" }}
      />
    </div>
  );
};

export default Tiptap;
