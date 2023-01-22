import React, { useEffect, useState } from "react";
import { RecipeImgs } from "../RecipeDetail/RecipeInfo/RecipeInfo.styled";
import {
  ImageCarouselButton,
  ImageCarouselButtonWrapper,
} from "./ImageCarousel.styled";
import ChevronIcon from "../Icon/ChevronIcon";
import { AnimatePresence } from "framer-motion";

type ImageCarouselProps = {
  images: string[];
  imgHeight: string;
};

const WHILE_TAP_SCALE_BUTTON = 0.9;

const ImageCarousel = ({ images, imgHeight }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        <RecipeImgs
          backgroundImage={`${images[currentIndex]}`}
          height={imgHeight}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <ImageCarouselButtonWrapper>
            <div className="flex justify-between p-2">
              <ImageCarouselButton
                whileTap={{ scale: WHILE_TAP_SCALE_BUTTON }}
                onClick={handlePrev}
              >
                <ChevronIcon rotation="left" color="white" />
              </ImageCarouselButton>

              <ImageCarouselButton
                whileTap={{ scale: WHILE_TAP_SCALE_BUTTON }}
                onClick={handleNext}
              >
                <ChevronIcon rotation="right" color="white" />
              </ImageCarouselButton>
            </div>
          </ImageCarouselButtonWrapper>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-center text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
