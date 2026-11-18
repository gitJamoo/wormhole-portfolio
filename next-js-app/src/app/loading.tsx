import BeaverLoader from "./components/BeaverLoader";

export default function Loading() {
  return (
    <div className="min-h-[60svh] grid place-items-center">
      <BeaverLoader />
    </div>
  );
}
