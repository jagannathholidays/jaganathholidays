import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import LegalContent from '@/components/LegalContent';
import { getLegalPage } from '@/lib/legalContent';

const content = getLegalPage('reservation-policy');

export const metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function ReservationPolicyPage() {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: content.title },
  ];

  return (
    <main>
      <BreadcrumbBanner
        title={content.title}
        breadcrumbs={breadcrumbs}
        bgImage="/jaganath-banner.webp"
      />
      <LegalContent
        content={content}
        contactTitle="Questions About Reservations?"
      />
    </main>
  );
}
