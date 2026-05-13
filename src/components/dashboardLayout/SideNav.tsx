"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

import Logo from "../Logo";
import { Button } from "../ui/button";

import { sidePortals } from "@/src/lib/contents";
import { PiSignOutBold } from "react-icons/pi";
import { useReactMutation } from "@/src/services/apiHelper";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function SideNav() {
  const pathName = usePathname();
  const router = useRouter();

 const {mutate, isPending}= useReactMutation('post')


const handleLogOut = () => {
  mutate(
    {
      path: "/auth/logout",
      data: "", // if your backend expects something
    },
    {
      onSuccess: () => {
        // Remove token from cookies
        deleteCookie("token");
        toast.success("Logged out successfully");
        // Redirect to login
        router.replace("/");
      },
      onError: (err:unknown) => {
        if (err instanceof AxiosError) {
            toast.error("Error", {
              description: err.response?.data?.message || "Something went wrong",
            });
          } else {
            toast.error("Error", { description: "Something went wrong" });
          }
        },
    }
  );
};

  return (
    <aside className="sticky top-0 h-screen flex flex-col justify-between items-center bg-secondary py-5">
      <div className="space-y-8">
        <Logo size={20} />
        <nav className="flex flex-col gap-y-2">
          {sidePortals.map((portal) => (
            <Link
              href={portal.link}
              key={portal.tabName}
              className={`text-primary hover:bg-primary flex items-center w-full rounded-sm gap-x-2.5 px-3 py-2 ${
                pathName === portal.link
                  ? "bg-primary text-primary-foreground"
                  : undefined
              } `}
            >
              <portal.icon />
              <span>{portal.tabName}</span>
            </Link>
          ))}
        </nav>
      </div>
      <Button
        onClick={handleLogOut}
        variant={"destructive"}
        disabled={isPending}
        className="capitalize space-x-1 cursor-pointer"
      >
        <PiSignOutBold />
        <span>sign out</span>
      </Button>
    </aside>
  );
}

/* 

 <article className='text-slate-300 w-full h-full'>
      <div className='w-full flex items-center justify-center py-5'>
        <Image src={exciteLogo} alt='logo' />
      </div>
      <div className='w-full p-5 flex flex-col gap-5'>
        {sidePortals.map((portal, index) => {
          return (
            <div key={index}>
              <Link href={portal.link}>
                <div
                  title={portal.tabName}
                  className={`w-full flex items-center gap-2 p-1 px-3 border border-slate-950/60 rounded-lg ${pathName === portal.link && 'bg-stone-800/60 border-stone-900/50'} hover:bg-stone-800/60 hover:border-stone-900/50 shadow`}
                >
                  <portal.icon />
                  <span>{portal.tabName}</span>
                </div>
              </Link>
            </div>
          );
        })}
        <Link href={'/'}>
          <div className='w-full flex items-center gap-2 p-1 px-3 border border-slate-950/60 rounded-lg hover:bg-stone-800/60 hover:border-stone-900/50 shadow'>
            <PiSignOutBold />
            <span>Sign-Out</span>
          </div>
        </Link>
      </div>
    </article>
*/
