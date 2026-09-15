import Image from "next/image";

export function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, 50vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full bg-mist ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
