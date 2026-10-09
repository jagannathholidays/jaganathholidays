"use client";

import Link from 'next/link';
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import AnimatedButton from './AnimatedButton';
import styles from './Banner.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ onClick, currentSlide }) {
  return (
    <button
      type="button"
      className={`${styles.arrowBtn} ${styles.prevArrow}`}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <FiChevronLeft className={styles.arrowIcon} />
    </button>
  );
}

function NextArrow({ onClick, currentSlide, slideCount }) {
  return (
    <button
      type="button"
      className={`${styles.arrowBtn} ${styles.nextArrow}`}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <FiChevronRight className={styles.arrowIcon} />
    </button>
  );
}

export default function BannerSlider({ banners = [] }) {
  if (!banners || banners.length === 0) {
    return null;
  }

  const isMultiple = banners.length > 1;

  const settings = {
    dots: false,
    arrows: isMultiple,
    infinite: isMultiple,
    fade: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isMultiple,
    autoplaySpeed: 5500,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section className={styles.bannerSliderWrapper}>
      <Slider {...settings}>
        {banners.map((banner, index) => {
          const isExternal = banner.link?.startsWith('http://') || banner.link?.startsWith('https://');
          const desktopImage = (banner.image && typeof banner.image === 'string' && banner.image.trim())
            ? banner.image
            : '/jaganath-banner.webp';
          const mobileImage = (banner.mobileImage && typeof banner.mobileImage === 'string' && banner.mobileImage.trim())
            ? banner.mobileImage
            : desktopImage;

          return (
            <div key={banner.id || index} className={styles.slideOuter}>
              <div
                className={styles.bannerSlide}
                style={{
                  '--bg-desktop': `url(${desktopImage})`,
                  '--bg-mobile': `url(${mobileImage})`,
                }}
              >
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                  <h1 className={styles.title}>{banner.title}</h1>
                  {banner.subtitle && (
                    <p className={styles.subtitle}>{banner.subtitle}</p>
                  )}
                  <AnimatedButton
                    href={banner.link || '/packages'}
                    className={styles.btnDestinations}
                  >
                    {banner.buttonText || 'Explore Now'}
                  </AnimatedButton>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
