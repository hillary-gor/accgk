import { supabaseServer } from "@/lib/supabaseServer";
import { logoutAction } from "@/app/auth/actions";

export default async function Dashboard() {
  const supabase = supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome {session.user.email}!</h1>
      <form action={logoutAction}>
        <button type="submit" className="bg-gray-800 text-white p-2 mt-4">Logout</button>
      </form>
    </div>
  );
}
