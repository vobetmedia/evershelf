import { EDITORIAL_SLIDES } from "@/data/home";
import { LIFESTYLE } from "@/data/images";
import { Photo } from "./Photo";
import { ButtonLink } from "./ui";

export function EditorialCarousel() {
  const slide = EDITORIAL_SLIDES[0];
  return (
    <section className="mt-5 bg-mist md:mt-[100px]">
      <div className="relative aspect-[3/4] w-full md:hidden">
        <Photo src={LIFESTYLE.editorial[1]} alt={slide.title} sizes="100vw" priority />
        <span className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
          <h2 className="display text-[56px] leading-[50px]">{slide.title}</h2>
          <p className="display mt-3 text-[16px]">{slide.kicker}</p>
          <p className="mt-3 text-[15px] leading-5">{slide.body}</p>
          <div className="mt-5">
            <ButtonLink href={slide.cta.href}>{slide.cta.label}</ButtonLink>
          </div>
        </div>
      </div>

      <div className="container-site hidden items-center gap-8 md:grid md:grid-cols-2">
        <div>
          <h2 className="display text-[80px] xl:text-[104px] xl:leading-[88px]">{slide.title}</h2>
          <p className="display mt-4 text-[26px]">{slide.kicker}</p>
          <p className="mt-6 max-w-[460px] text-[17px] leading-6">{slide.body}</p>
          <div className="mt-8">
            <ButtonLink href={slide.cta.href}>{slide.cta.label}</ButtonLink>
          </div>
        </div>
        <div className="h-[720px] w-full">
          <Photo src={LIFESTYLE.editorial[1]} alt={slide.title} sizes="50vw" priority />
        </div>
      </div>
    </section>
  );
}
