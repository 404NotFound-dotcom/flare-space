import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Siren, AlertTriangle, Home, Map as MapIcon, LifeBuoy,
  Search, Bell, Phone, Layers
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveMap } from "@/components/map/InteractiveMap";

export default function Citizen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, if yes redirect to dashboard
    const authData = localStorage.getItem("citizenAuth");
    if (authData) {
      const userData = JSON.parse(authData);
      if (userData.isLoggedIn) {
        navigate("/citizen/dashboard");
        return;
      }
    }
    // If not logged in, redirect to login page
    navigate("/citizen/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Redirecting...</div>
    </div>
  );
}
