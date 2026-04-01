import Image from "next/image";

import exciteLogo from "@/public/assets/svgFiles/exciteLogo.svg";

export default function Logo({ size }: { size?: number }) {
  return (
    <Image
      src={exciteLogo}
      alt="Excite logo"
      className={`w-${size ?? "full"} mx-auto`}
    />
  );
}
