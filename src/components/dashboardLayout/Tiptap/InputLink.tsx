"use client";
import React, { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Link } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

type Props = {
  editor: Editor;
};

const InputLink = ({ editor }: Props) => {
  const [link, setLink] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    e.preventDefault();

    setLink(e.target.value);
  };

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editor.chain().focus().toggleLink({ href: link }).run();
  };

  const removeLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setLink("");
    editor.chain().focus().toggleLink({ href: link }).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={
            editor.isActive("link")
              ? "bg-[#00000047] text-black p-2 rounded-lg"
              : "text-black p-2"
          }
        >
          <Link className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Insert link</h4>
          <div>
            <input
              type="url"
              id="link"
              className="border border-[#00000047] p-2 w-full rounded-sm focus:outline-none"
              required
              value={link}
              onChange={handleChange}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="w-full flex items-center justify-end space-x-2">
            <button
              onClick={editor.isActive("link") ? removeLink : addLink}
              className={`${
                editor.isActive("link") ? "bg-[#f00]" : "bg-[#020F54]"
              } text-xs items-center rounded p-2 text-white`}
            >
              {editor.isActive("link") ? "Remove" : "Add link"}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InputLink;
