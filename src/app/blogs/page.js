import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Tour Blogs - Travel News & Updates in Odisha | Jagannath Holidays',
  description: 'Learn more about the custom tour packages provided by the leading family-owned tour agency, Jagannath Holidays, by reading their thrilling travel blogs.',
};

export default async function BlogsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Blogs' }
  ];

  return (
    <main>
      <BreadcrumbBanner 
        title="Our Latest Blogs" 
        breadcrumbs={breadcrumbs} 
        bgImage="/jaganath-banner.webp"
      />
      <BlogList page={page} />
    </main>
  );
}
