import { FormEvent, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import { isLoggedAtom, emailAtom } from "../atoms/useratoms.tsx";
import api from "../api/axiosinstance";

export default function Login() {
  const setisLoggedIn = useSetRecoilState(isLoggedAtom);
  // const [email, setemail] = useState<string>("");
  const [email, setemail] = useRecoilState(emailAtom);
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) setisLoggedIn(true);
  // }, []);

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        let response = await api.post("/api/login", { email, password });
        console.log("Login response:", response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setisLoggedIn(true);
          setemail(email);
          console.log(email);
          setpassword("");
          navigate("/landingpage");
        } else {
          console.error("Login failed: No token received");
        }
      } catch (err: any) {
        console.error("Login failed:", err.response?.data || err.message);
      }
    },
    [email, password, navigate, setisLoggedIn]
  );

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter email"
              type="text"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
