import {FC} from "react";
import {ScrollTopBottom, StaticScreenFrame, TheFooter, TheHeader} from "@/components/index";

const DefaultTemplate: FC = ({children}) => (
  <StaticScreenFrame>
    <main className="bg-neutral-100 rounded-lg dark:bg-slate-800 font-mono sm:mt-[93px] xs:p-2.5">
      <TheHeader/>

      <div className="min-h-screen">
        {children}
      </div>

      <TheFooter/>
      <ScrollTopBottom/>
    </main>
  </StaticScreenFrame>
)

export default DefaultTemplate
