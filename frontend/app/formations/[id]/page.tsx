import FormationDetail from './FormationDetail';

export default function FormationDetailPage({ params }: { params: { id: string } }) {
  return <FormationDetail formationId={params.id} />;
}

