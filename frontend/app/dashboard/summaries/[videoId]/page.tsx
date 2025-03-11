import { getSummaryById } from "@/data/loaders";
import { SummaryCardForm } from "@/components/forms/SummaryCardForm";

interface ParamsProps {
  params: {
    videoId: string;
  };
}

export default async function SummaryCardRoute({ params }: ParamsProps) {
  const { videoId } = await params;
  const data = await getSummaryById(videoId);
  return <SummaryCardForm item={data.data} />;
}
