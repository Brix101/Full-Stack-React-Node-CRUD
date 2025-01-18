import { trpc } from "@/utils/trpc";

function App() {
  const greetQuery = trpc.greeting.useQuery();

  return (
    <>
      <p className="read-the-docs">
        {greetQuery.isLoading ? "Loading" : greetQuery.data}
      </p>
    </>
  );
}

export default App;
