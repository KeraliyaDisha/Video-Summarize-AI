import { getSummaryById } from "@/data/loaders";
import { SummaryCardForm } from "@/components/forms/SummaryCardForm";

interface ParamsProps {
  params: {
    videoId: string;
  };
}

export default async function SummaryCardRoute(props: Readonly<ParamsProps>) {
  const params = await props?.params;
//   const { videoId } = params;
  const data = await getSummaryById(params.videoId);
  return <SummaryCardForm item={data.data} />;
}