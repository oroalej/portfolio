import {FC} from "react";

const buttonClasses = [
  'bg-rose-400', 'bg-yellow-300', 'bg-green-400'
]

const FauxMenu: FC = () => (
  <div className="flex flex-row gap-2 lg:gap-3 justify-start relative">
    {
      buttonClasses.map(classes => (
        <span className={`w-2.5 h-2.5 lg:w-[0.6875rem] lg:h-[0.6875rem] rounded-full opacity-80 ${classes}`}
              key={classes}/>
      ))
    }
  </div>
)

export default FauxMenu;
