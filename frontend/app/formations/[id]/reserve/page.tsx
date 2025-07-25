import ReservationForm from './ReservationForm';

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

export default function ReservationPage({ params }: { params: { id: string } }) {
  return <ReservationForm formationId={params.id} />;
}