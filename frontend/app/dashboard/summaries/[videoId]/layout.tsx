import { extractYouTubeID } from "@/lib/utils";
import { getSummaryById } from "@/data/loaders";
import YouTubePlayer from "@/components/global/YouTubePlayer";
import { notFound } from "next/navigation";

export default async function SummarySingleRoute({
  params,
  children,
}: {
    readonly params: any;
    readonly children: React.ReactNode;
}) {

  
  const data = await getSummaryById(params.videoId);
  const summaryData = data.data;
  
  if (summaryData.error?.status === 404) return notFound();
  
  const extractedVideoId = extractYouTubeID(summaryData.videoId);
  if (!extractedVideoId) {
    return notFound();
  }
  
  return (
    <div>
      <div className="h-full grid gap-4 grid-cols-5 p-4">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <div>
            <YouTubePlayer videoId={extractedVideoId} />
          </div>
        </div>
      </div>
    </div>
  );
}
