import {FC} from "react";

const StaticScreenFrame: FC = ({children}) => (
  <div className="relative">
    <div className={`hidden xs:block fixed w-full z-50 dark:bg-slate-800 bg-neutral-100 top-0 h-2.5`}/>
    <div className={`hidden xs:block fixed w-full z-50 dark:bg-slate-800 bg-neutral-100 bottom-0 h-2.5`}/>
    <div className={`hidden xs:block fixed h-full z-50 dark:bg-slate-800 bg-neutral-100 left-0 top-0 w-2.5`}/>
    <div className={`hidden xs:block fixed h-full z-50 dark:bg-slate-800 bg-neutral-100 right-0 top-0 w-2.5`}/>

    {children}
  </div>
)

export default StaticScreenFrame;
