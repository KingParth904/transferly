import TransferCard from "../components/tranfer/TransferCard";

export default function TransferPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Send Money</h1>
        <p className="text-gray-400 mt-2">
          Quick and secure transfers to anyone on Transferly.
        </p>
      </header>
      
      <TransferCard />
    </div>
  );
}
