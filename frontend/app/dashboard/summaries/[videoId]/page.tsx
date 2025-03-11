import { getSummaryById } from "@/data/loaders";
import { SummaryCardForm } from "@/components/forms/SummaryCardForm";

export default async function SummaryCardRoute({ params }: { params: { videoId: string } }) {
  const data = await getSummaryById(params.videoId);
  return <SummaryCardForm item={data.data} />;
}
