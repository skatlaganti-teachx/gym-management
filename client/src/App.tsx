import Header from "@/components/custom/Header"
import Stats from "./components/custom/Stats"
import TableChart from "./components/custom/TableChart"
import GetMembers from "./hooks/GetMembers";

function App() {
  const members = GetMembers();
  console.log("🚀 ~ App ~ members:", members)

  return (
    <div className="flex justify-center items-start flex-col p-8 gap-5">
      <Header />
      <Stats />
      <TableChart />
    </div>
  )
}

export default App
