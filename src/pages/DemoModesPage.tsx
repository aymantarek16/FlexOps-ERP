import { CheckCircle2, Palette, RefreshCcw } from "lucide-react";
import { businessModes } from "../data/businessModes";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { useToast } from "../components/ui/Toast";
import { useFlexOpsStore } from "../store/useFlexOpsStore";

export function DemoModesPage(): JSX.Element {
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const applyBusinessMode = useFlexOpsStore((state) => state.applyBusinessMode);
  const { notify } = useToast();

  const handleApplyMode = (modeId: typeof selectedMode, modeName: string) => {
    applyBusinessMode(modeId);
    notify(`تم تطبيق وضع ${modeName} وتحديث بيانات نسخة العرض`);
  };

  return (
    <PageContainer title="أوضاع العرض" description="خمسة قوالب جاهزة تغير اسم النشاط، المصطلحات، بيانات نسخة العرض، ولون الواجهة.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {businessModes.map((mode) => {
          const isActive = selectedMode === mode.id;

          return (
            <Card key={mode.id} className={isActive ? "border-primary ring-4 ring-primary/10" : ""}>
              <CardHeader
                title={mode.name}
                description={mode.description}
                action={isActive ? <Badge tone="success">مفعل</Badge> : <Badge>جاهز</Badge>}
              />
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-black text-ink">{mode.businessName}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{mode.businessType}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Customer</p>
                    <p className="mt-1 text-ink">{mode.labels.customer}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Order</p>
                    <p className="mt-1 text-ink">{mode.labels.order}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Product</p>
                    <p className="mt-1 text-ink">{mode.labels.product}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                    <Palette size={17} />
                    <span className="h-5 w-5 rounded-full" style={{ backgroundColor: mode.primaryColor }} />
                    {mode.accent}
                  </span>
                  <Button
                    variant={isActive ? "secondary" : "primary"}
                    icon={isActive ? <CheckCircle2 size={17} /> : <RefreshCcw size={17} />}
                    onClick={() => handleApplyMode(mode.id, mode.name)}
                  >
                    {isActive ? "مفعل" : "تطبيق"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
