import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import FullGallery from '@/components/FullGallery';
import { getImageUrl } from '@/lib/api';

const fallbackGalleryImages = [
  "/loved-destination-1.png",
  "/loved-destination-2.png",
  "/loved-destination-3.png",
  "/loved-destination-4.jpg",
  "/loved-destination-2.png",
  "/loved-destination-1.png",
  "/loved-destination-3.png",
  "/loved-destination-4.jpg",
  "/loved-destination-3.png",
  "/loved-destination-4.jpg",
  "/loved-destination-1.png",
  "/loved-destination-2.png",
];

async function fetchGallery(page = 1) {
  try {
    const res = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
      },
      body: JSON.stringify({
        content_type_id: 'gallery',
        status: 'published'
      }),
      next: { revalidate: 86400 },
    });

    const result = await res.json();
    if (result.success && result.data?.data?.length > 0) {
      const items = result.data.data.map((item, index) => {
        const itemData = item.data || {};
        const title = itemData.title || item.title || `Gallery Image ${index + 1}`;
        const rawImage = itemData.image?.file_path || itemData.image;
        const src = getImageUrl(rawImage, `/loved-destination-${(index % 4) + 1}.png`);

        return {
          id: item.id || item._id || index,
          src,
          title,
        };
      });

      return {
        items,
        currentPage: Number(result.data.current_page) || Number(page) || 1,
        hasNextPage: Boolean(result.data.next_page_url),
        hasPrevPage: Boolean(result.data.prev_page_url) || page > 1,
      };
    }
  } catch (err) {
    console.error('Error fetching gallery items:', err);
  }

  return {
    items: fallbackGalleryImages.map((src, index) => ({
      id: index + 1,
      src,
      title: `Gallery Image ${index + 1}`,
    })),
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

export default async function GalleryPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const { items, currentPage, hasNextPage, hasPrevPage } = await fetchGallery(page);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Gallery' }
  ];

  return (
    <main>
      <BreadcrumbBanner
        title="Image Gallery"
        breadcrumbs={breadcrumbs}
        bgImage="/jaganath-banner.webp"
      />
      <FullGallery
        images={items}
        pagination={{ currentPage, hasNextPage, hasPrevPage }}
      />
    </main>
  );
}
