import { allReviews, bestsellers, products } from "@/data/products";
import {
  Directory,
  EarnTrust,
  FeaturedHomes,
  HomeHero,
  NewsletterBar,
  RealAnswers,
  RealTalk,
  SectionHead,
  SocialRail,
  Splurge,
  WorthIt,
} from "@/components/home";
import { EditorialCarousel } from "@/components/EditorialCarousel";
import { ReviewCarousel } from "@/components/ReviewCarousel";

export default function HomePage() {
  const featuredReviews = allReviews.filter((r) => r.rating === 5).slice(0, 8);
  const worthIt = [...bestsellers, ...products.filter((p) => !p.bestseller)].slice(0, 5);
  const splurge = [...products].sort((a, b) => b.price - a.price).slice(0, 4);

  return (
    <>
      <HomeHero />
      <FeaturedHomes />
      <EditorialCarousel />
      <WorthIt items={worthIt} />

      <section id="reviews" className="container-site mt-16 md:mt-[100px]">
        <SectionHead
          title="Real reviews"
          subtitle="Honest takes from real people who know what's Worth It (or not)"
          link={{ href: "/reviews", label: "Read reviews" }}
        />
        <ReviewCarousel reviews={featuredReviews} />
      </section>

      <RealTalk />
      <Splurge items={splurge} />
      <RealAnswers />
      <SocialRail />
      <EarnTrust />
      <Directory />
      <NewsletterBar />
    </>
  );
}
