import Container from "@/app/(web)/_components/Container";

const AboutMeSection = () => {
  return (
    <div className="bg-neutral-900 text-neutral-300 rounded-lg py-32 drop-shadow-lg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="w-64 h-80 sm:w-72 sm:h-[22.50rem] md:w-80 md:h-[25rem] rounded-xl bg-white transform -rotate-3 lg:ml-16 mx-auto"></div>
          <div className="self-center mt-12 lg:mt-0 sm:px-20 lg:px-0">
            <div className="mb-4 font-bold text-lg sm:text-2xl">Hi!</div>

            <div className="text-sm sm:text-base">
              <p className="mb-5">
                {
                  "I'm Alex, a developer, blockchain enthusiast, and hobbyist photographer, from Naga City, Philippines. "
                }
                Welcome to my little virtual world. I hope you find what you are
                looking for.
              </p>

              <p>Thanks for dropping by,</p>
              <p>Alex</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutMeSection;
