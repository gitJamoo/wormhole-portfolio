import PixelLanding from "./components/PixelLanding";
import WorkContent from "./home/WorkContent";

// A new pixel-art landscape on every visit; scroll down for the work, experience and projects.
export default function Home() {
  return (
    <PixelLanding>
      <WorkContent compactHeader />
    </PixelLanding>
  );
}
