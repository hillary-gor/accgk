import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Welcome Back
        </h2>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <button
            formAction={login}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium transition hover:bg-blue-700"
          >
            Log in
          </button>
          <button
            formAction={signup}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 font-medium transition hover:bg-gray-200"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
