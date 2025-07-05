// // app/seed-workers/page.tsx
// "use client"

// import { useEffect } from "react"

// export default function SeedWorkersPage() {
//   useEffect(() => {
//     const seed = async () => {
//       const res = await fetch("/api/workers", {
//         method: "POST",
//       })
//       const data = await res.json()
//       console.log(data)
//       alert("Workers seeded successfully")
//     }

//     seed()
//   }, [])

//   return <div className="p-10 text-center text-xl">Seeding workers...</div>
// }
