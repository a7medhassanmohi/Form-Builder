import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <UserButton afterSignOutUrl="/sign-in"/>
    </main>
  )
}
