import { trpc } from "@/utils/trpc";

function App() {
  const greetQuery = trpc.greeting.useQuery();

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        {greetQuery.isLoading ? "Loading" : greetQuery.data}
      </p>
    </>
  );
}

export default App;
