import {Container, SectionWrapper} from "@/components/index";

const AboutMe = () => {
  return (
    <Container>
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            className="w-64 h-80 sm:w-72 sm:h-[22.50rem] md:w-80 md:h-[25rem] rounded-xl bg-neutral-800 dark:bg-neutral-900 transform -rotate-3 lg:ml-8 mx-auto">
          </div>
          <div className="self-center dark:text-neutral-200 text-neutral-600 mt-12 lg:mt-0 sm:px-20 lg:px-0">
            <div className="mb-4 font-bold text-lg sm:text-2xl">
              Hi!
            </div>

            <div className="text-sm sm:text-base">
              <p className="mb-5">
                {"I'm Alex from Naga City, Philippines! I’m a Developer and Hobbyist Photographer."}
                Welcome to my little virtual world—I hope you find what you are looking for!
              </p>

              <p>Thanks for dropping by,</p>
              <p>Alex</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Container>
  )
}

export default AboutMe;
