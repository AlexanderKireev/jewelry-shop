"use client";

import { useState } from "react";
import { createClientSide } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Импортируем иконки

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Состояние для "глаза"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClientSide();

  const handleAuth = async (type) => {
    setLoading(true);
    setMessage("");

    try {
      if (type === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
        });
        if (error) throw error;
        setMessage("Успех! Проверьте почту для подтверждения.");
      }
    } catch (error) {
      setMessage(`Ошибка: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center">Магазин 2026 🇲🇩</h1>

        <div className="flex flex-col gap-4">
          {/* Поле Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full mt-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Поле Пароля с Глазом */}
          <div>
            <label className="text-sm font-medium text-gray-700">Пароль</label>
            <div className="relative mt-1">
              <input
                className="w-full border p-2 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                type={showPassword ? "text" : "password"} // Меняем тип поля
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.includes("Ошибка") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
              }`}>
              {message}
            </div>
          )}

          <button
            disabled={loading}
            onClick={() => handleAuth("login")}
            className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {loading ? "Загрузка..." : "Войти"}
          </button>

          {/* <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase text-center font-bold">или</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            disabled={loading}
            onClick={() => handleAuth('signup')}
            className="w-full border border-gray-300 text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Создать аккаунт
          </button> */}
        </div>
      </div>
    </div>
  );
}
