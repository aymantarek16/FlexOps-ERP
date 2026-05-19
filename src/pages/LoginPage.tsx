import { Building2, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../components/ui/Toast";
import { useFlexOpsStore } from "../store/useFlexOpsStore";

export function LoginPage(): JSX.Element {
  const isAuthenticated = useFlexOpsStore((state) => state.isAuthenticated);
  const login = useFlexOpsStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useToast();
  const [email, setEmail] = useState("demo@flexops.com");
  const [password, setPassword] = useState("123456");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
    notify("تم الدخول إلى نسخة العرض بنجاح");
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";
    navigate(from, { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(14, 116, 144, 0.92), rgba(15, 23, 42, 0.94)), url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-12">
            <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <Building2 size={22} />
              <span className="font-black">FlexOps ERP</span>
            </div>
            <div className="max-w-xl">
              <p className="text-sm font-bold text-cyan-100">نظام إدارة الأعمال الذكي</p>
              <h1 className="mt-4 text-5xl font-black leading-tight">إدارة العملاء، الطلبات، الفواتير، المصروفات، والتقارير من مكان واحد.</h1>
              <p className="mt-5 text-lg leading-9 text-slate-200">
                حل إداري مرن لأي نشاط تجاري، يساعدك تنظم الشغل وتتابع الأداء باحترافية.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-canvas p-4 text-ink sm:p-8">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <Building2 size={26} />
              </div>
              <h2 className="mt-5 text-2xl font-black">تسجيل دخول نسخة العرض</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">استخدم بيانات نسخة العرض للدخول مباشرة إلى لوحة التحكم.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="البريد الإلكتروني"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                icon={<Mail size={17} />}
                autoComplete="email"
              />
              <Input
                label="كلمة المرور"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                icon={<LockKeyhole size={17} />}
                autoComplete="current-password"
              />
              <Button className="w-full" size="lg" type="submit">
                دخول إلى لوحة التحكم
              </Button>
            </form>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
              <p className="font-black text-ink">بيانات دخول نسخة العرض</p>
              <div className="mt-3 space-y-2 text-slate-600">
                <p>البريد: demo@flexops.com</p>
                <p>كلمة المرور: 123456</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
