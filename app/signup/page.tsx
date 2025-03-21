import { signup } from "../../app/login/actions";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Sign Up</h2>

      <form action={signup} className="flex flex-col gap-4" method="POST">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}
