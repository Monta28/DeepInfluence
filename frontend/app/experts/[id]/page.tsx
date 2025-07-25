import ExpertProfile from './ExpertProfile';

export default function ExpertPage({ params }: { params: { id: string } }) {
  return <ExpertProfile expertId={params.id} />;
}

