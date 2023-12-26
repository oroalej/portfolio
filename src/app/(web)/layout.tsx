import { Fragment } from "react";
import { Tooltip } from "@/components";
import { Toaster } from "react-hot-toast";
import { BaseComponent } from "@/types";
import TheHeader from "@/app/(web)/_components/TheHeader";
import TheFooter from "@/app/(web)/_components/TheFooter";
import ContactMeSection from "@/app/(web)/_components/ContactMeSection";

const WebLayoutRoot = ({ children }: Pick<BaseComponent, "children">) => (
  <Fragment>
    <Tooltip
      id="guest-tooltip"
      place="top"
      className="!bg-neutral-300 !opacity-100 !text-neutral-800 z-[9999]"
    />

    <div className="sm:p-3.5 flex flex-col h-full font-mono">
      <span className="fixed inset-x-0 top-0 h-3.5 bg-white z-[1] hidden sm:block" />
      <span className="fixed inset-x-0 bottom-0 h-3.5 bg-white z-[1] hidden sm:block" />
      <span className="fixed inset-y-0 left-0 w-3.5 bg-white z-[1] hidden sm:block" />
      <span className="fixed inset-y-0 right-0 w-3.5 bg-white z-[1] hidden sm:block" />

      <div className="rounded-lg bg-zinc-50 dark:bg-neutral-800">
        <TheHeader />

        {children}

        <ContactMeSection />
        <TheFooter />
      </div>
      <span className="h-3.5 block text-xs invisible">Padding</span>
    </div>

    <Toaster position="top-right" gutter={8} containerClassName="text-sm" />
  </Fragment>
);

export default WebLayoutRoot;
