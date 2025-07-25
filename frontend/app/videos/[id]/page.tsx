import VideoPlayer from './VideoPlayer';

export default function VideoPage({ params }: { params: { id: string } }) {
  return <VideoPlayer videoId={params.id} />;
}

