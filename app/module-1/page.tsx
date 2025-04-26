import { Suspense } from "react";
import { ModuleShell } from "@/components/module/ModuleShell";

export default function Module1Page() {
  return (
    <Suspense>
      <ModuleShell />
    </Suspense>
  );
}
