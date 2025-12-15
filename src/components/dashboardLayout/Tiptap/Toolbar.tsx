"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  //   Strikethrough,
  Italic,
  List,
  ListOrdered,
  //   Heading2,
  Underline,
  //   Quote,
  Undo,
  Redo,
  //   Code,
  //   Link,
  //   ImageIcon,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

import InputLink from "./InputLink";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="absolute inset-x-0 top-0 px-2 py-1 flex justify-between items-start gap-5 w-full flex-wrap border-b border-b-[#00000047]">
      <div className="flex items-center gap-1 w-full flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBold().run();
                }}
                className={
                  editor.isActive("bold")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <Bold className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleItalic().run();
                }}
                className={
                  editor.isActive("italic")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <Italic className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleUnderline().run();
                }}
                className={
                  editor.isActive("underline")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <Underline className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={
                  editor.isActive("bulletList")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <List className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Unordered list</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={
                  editor.isActive("orderedList")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <ListOrdered className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Ordered list</TooltipContent>
          </Tooltip>

          <InputLink editor={editor} />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().undo().run();
                }}
                className={
                  editor.isActive("undo")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <Undo className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().redo().run();
                }}
                className={
                  editor.isActive("redo")
                    ? "bg-[#00000047] text-black p-2 rounded-lg"
                    : "text-black p-2"
                }
              >
                <Redo className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Toolbar;
