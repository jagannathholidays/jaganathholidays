import BannerSlider from './BannerSlider';
import { getImageUrl } from '@/lib/api';

/* ── Data fetching ── */
async function fetchMainBanners() {
  const dummyBanners = [
    {
      id: 'default-1',
      title: 'Jagannath Holidays\nDiscover. Experience.\nCelebrate',
      subtitle: 'Your trusted travel partner for unforgettable journeys across India and beyond.',
      buttonText: 'View All Destinations',
      link: '/packages',
      image: '/jaganath-banner.webp',
      mobileImage: '/jaganath-banner.webp',
    },
  ];

  try {
    const res = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
      },
      body: JSON.stringify({ content_type_id: 'main-banner', status: 'published', sort_by: "data.sort_order",sort_order: "asc"}),
      next: { revalidate: 0 },
    });

    const result = await res.json();
    if (result.success && result.data?.data?.length > 0) {
      return result.data.data.map((item, index) => {
        const itemData = item.data || {};

        const extractPath = (img) => {
          if (!img) return null;
          if (typeof img === 'string') return img.trim() || null;
          if (typeof img === 'object') {
            const path = img.file_path || img.url;
            return typeof path === 'string' && path.trim() ? path.trim() : null;
          }
          return null;
        };

        const imagePath = extractPath(itemData.banner_image);
        const mobileImagePath = extractPath(itemData.mobile_image);
        const image = getImageUrl(imagePath, '/jaganath-banner.webp');
        const mobileImage = mobileImagePath ? getImageUrl(mobileImagePath, image) : image;

        return {
          id: item.id || item._id || index,
          title: itemData.title || item.title || 'Jagannath Holidays',
          subtitle: itemData.short_description || '',
          buttonText: itemData.button_text || 'Explore Now',
          link: itemData.link || '/packages',
          image,
          mobileImage,
        };
      });
    }
  } catch (err) {
    console.error('Error fetching main banner:', err);
  }

  return dummyBanners;
}

export default async function Banner() {
  const banners = await fetchMainBanners();

  return <BannerSlider banners={banners} />;
}
