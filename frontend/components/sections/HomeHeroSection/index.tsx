import Link from "next/link";
import { getUserMeLoader } from "@/data/services/getUserMeLoader";
import { HomeHeroSectionProps } from "@/types/HomeHeroSection";
import { StrapiImage } from "../../global/StrapiImage";

export async function HomeHeroSection({
  data,
}: {
  readonly data: HomeHeroSectionProps;
}) {
  const user = await getUserMeLoader();
  const userLoggedIn = user?.ok;

  const { heading, subHeading, image, link } = data;
  const linkUrl = userLoggedIn ? "./dashboard" : link.url;

  return (
    <header className="relative h-[400px] overflow-hidden">
      <StrapiImage
        alt={image.alternativeText ?? "no alternative text"}
        className="absolute inset-0 object-cover w-full h-full"
        height={1080}
        src={image.url}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-opacity-30">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{subHeading}</p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={linkUrl}
        >
          {userLoggedIn ? " Go to Dashboard" : link.text}
        </Link>
      </div>
    </header>
  );
}
