"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import { shimmer, toBase64 } from "src/lib/utils";

export const FloatingImages = ({ images }: { images: string[] }) => {
  return (
    <div className="fiximage mb-5 rounded border border-transparent border-opacity-100">
      <div className="relative mb-10 h-[320px] w-full md:h-[520px] xl:h-[820px]">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 transform shadow-lg hover:z-10 hover:shadow-2xl`}
            style={{ rotate: `${index * 6 - 1}deg` }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Image
              src={src}
              height={550}
              width={1250}
              alt={`Cover Image ${index + 1}`}
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1250, 550)
              )}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
