
import BookExpertForm from './BookExpertForm';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default function BookExpertPage({ params }: { params: { id: string } }) {
  return <BookExpertForm expertId={params.id} />;
}
