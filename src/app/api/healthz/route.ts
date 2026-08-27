import { NextResponse } from "next/server";
import { HealthCheckResponse } from "@/lib/health";

export const dynamic = "force-dynamic";

export function GET() {
  const data = HealthCheckResponse.parse({ status: "ok" });
  return NextResponse.json(data);
}
