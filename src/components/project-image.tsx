"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type ProjectImageProps = {
  src: string;
  alt: string;
  /** Intrinsic size of the source file. Defaults to a 16:9 screenshot. */
  width?: number;
  height?: number;
};

export function ProjectImage({
  src,
  alt,
  width = 1280,
  height = 720,
}: ProjectImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border shadow-2xl"
        aria-label="Open image in lightbox"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
      />
    </>
  );
}
