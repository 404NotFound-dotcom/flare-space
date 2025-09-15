import { Link } from "react-router-dom";
import { User, LifeBuoy, Shield, Building2, CheckCircle2, PlusCircle, Siren } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleMaps } from "@/components/GoogleMaps";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Index() {
  const [skill, setSkill] = useState("");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-home-gradient">
      <main className="max-w-7xl mx-auto px-6 pb-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t('app.name')} - {t('app.subtitle')}
            </h1>
            <p className="mt-2 text-primary font-medium"></p>
            <p className="mt-3 text-lg text-muted-foreground">
            
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Link to="/citizen" className="card-hover animate-slide-up" style={{animationDelay:'0ms'}}>
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 grid place-items-center">
                    <User className="text-primary" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[hsl(var(--heading))]">{t('roles.citizen.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('roles.citizen.description')}</p>
                </div>
              </Link>
              <Link to="/volunteer" className="card-hover animate-slide-up" style={{animationDelay:'80ms'}}>
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 grid place-items-center">
                    <LifeBuoy className="text-emerald-600" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[hsl(var(--heading))]">{t('roles.volunteer.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('roles.volunteer.description')}</p>
                </div>
              </Link>
              <Link to="/admin" className="card-hover animate-slide-up" style={{animationDelay:'160ms'}}>
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 grid place-items-center">
                    <Shield className="text-orange-600" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[hsl(var(--heading))]">{t('roles.admin.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('roles.admin.description')}</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="relative animate-float w-full">
            <GoogleMaps
              className="w-full rounded-2xl shadow-xl border"
              height="calc(100vh - 300px)"
              center={{ lat: 28.6139, lng: 77.2090 }}
              zoom={10}
              mapType="hybrid"
              userRole="guest"
              showControls={true}
              showLayerControl={true}
              defaultFullscreen={false}
            />
          </div>
        </section>
      </main>
    </div>
  );
}