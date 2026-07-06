import AdmissionSlip from "@/components/AdmissionSlip";
import StatsBar from "@/components/StatsBar";
import MarkSheet from "@/components/MarkSheet";
import StepsSection from "@/components/StepsSection";

export default function HomePage() {
  return (
    <>
      <AdmissionSlip />
      <StatsBar />
      <MarkSheet />
      <StepsSection />
    </>
  );
}
