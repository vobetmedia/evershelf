import { EDITORIAL_SLIDES } from "@/data/home";
import { LIFESTYLE } from "@/data/images";
import { Photo } from "./Photo";
import { ButtonLink } from "./ui";

export function EditorialCarousel() {
  const slide = EDITORIAL_SLIDES[0];
  return (
    <section className="mt-10 bg-mist md:mt-[100px]">
      <div className="container-site grid items-center gap-8 py-12 md:grid-cols-2 md:py-0">
        <div>
          <h2 className="display text-[54px] md:text-[80px] xl:text-[104px] xl:leading-[88px]">{slide.title}</h2>
          <p className="display mt-4 text-[20px] md:text-[26px]">{slide.kicker}</p>
          <p className="mt-6 max-w-[460px] text-[17px] leading-6">{slide.body}</p>
          <div className="mt-8">
            <ButtonLink href={slide.cta.href}>{slide.cta.label}</ButtonLink>
          </div>
        </div>
        <div className="aspect-[4/5] w-full md:aspect-auto md:h-[720px]">
          <Photo src={LIFESTYLE.editorial[1]} alt={slide.title} sizes="(min-width: 768px) 50vw, 100vw" priority />
        </div>
      </div>
    </section>
  );
}
