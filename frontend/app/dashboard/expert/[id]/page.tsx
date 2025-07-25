
import ExpertProfile from './ExpertProfile';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function ExpertPage({ params }: { params: { id: string } }) {
  return <ExpertProfile expertId={params.id} />;
}
