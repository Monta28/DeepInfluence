import VideoSession from './VideoSession';

export async function generateStaticParams() {
  return [
    { sessionId: 'session-1' },
    { sessionId: 'session-2' },
    { sessionId: 'session-3' },
    { sessionId: 'session-4' },
    { sessionId: 'session-5' },
  ];
}

export default function VideoSessionPage({ params }: { params: { sessionId: string } }) {
  return <VideoSession sessionId={params.sessionId} />;
}