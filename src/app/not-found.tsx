import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="display text-[64px] md:text-[104px]">Wilted</h1>
      <p className="mx-auto mt-4 max-w-[420px] text-[17px] leading-6">
        That page does not exist. Which is more than we can say for a real fern after a long weekend.
      </p>
      <div className="mt-8">
        <ButtonLink href="/shop">Back to the shop</ButtonLink>
      </div>
    </div>
  );
}
