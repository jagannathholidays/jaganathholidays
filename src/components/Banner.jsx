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
    },
  ];

  try {
    const res = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
      },
      body: JSON.stringify({ content_type_id: 'main-banner', status: 'published' }),
      next: { revalidate: 86400 },
    });

    const result = await res.json();
    if (result.success && result.data?.data?.length > 0) {
      return result.data.data.map((item, index) => {
        const itemData = item.data || {};
        const imagePath = itemData.banner_image?.file_path || itemData.banner_image;
        const image = getImageUrl(imagePath, '/jaganath-banner.webp');

        return {
          id: item.id || item._id || index,
          title: itemData.title || item.title || 'Jagannath Holidays',
          subtitle: itemData.short_description || '',
          buttonText: itemData.button_text || 'Explore Now',
          link: itemData.link || '/packages',
          image,
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
