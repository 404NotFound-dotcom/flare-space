import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Heart, Info, MapPin, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";

export default function CitizenDonations() {
  const [amount, setAmount] = useState<string>("");
  const [donationName, setDonationName] = useState<string>("");
  const [donationEmail, setDonationEmail] = useState<string>("");
  const [donationPhone, setDonationPhone] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasCertificate, setHasCertificate] = useState<boolean>(false);
  const [donationDate, setDonationDate] = useState<string>("");
  const [certificateId, setCertificateId] = useState<string>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [lastDownloadTime, setLastDownloadTime] = useState<number>(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  // Generate a unique certificate ID
  useEffect(() => {
    const generateCertId = () => {
      const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
      const datePart = Date.now().toString(36).toUpperCase();
      return `ASHA-${randomPart}-${datePart}`;
    };
    
    setCertificateId(generateCertId());
    
    // Format current date
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    setDonationDate(formattedDate);
  }, []);

  const handleDonation = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: t("donations.errors.invalidAmount"),
        description: t("donations.errors.enterValidAmount"),
        variant: "destructive"
      });
      return;
    }
    
    if (!donationName.trim()) {
      toast({
        title: t("donations.errors.invalidName") || "Name Required",
        description: t("donations.errors.enterName") || "Please enter your name for the donation certificate.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate donation process
    setTimeout(() => {
      toast({
        title: t("donations.success.title"),
        description: t("donations.success.description", { amount: amount.replace("₹", "Rs.") }),
      });
      setHasCertificate(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDownloadCertificate = () => {
    // Debounce mechanism to prevent multiple rapid clicks
    const now = Date.now();
    if (now - lastDownloadTime < 3000) { // 3 second cooldown
      return;
    }
    setLastDownloadTime(now);
    setIsGeneratingPdf(true);
    
    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        hotfixes: ["px_scaling"]
      });

      // Set background color
      doc.setFillColor(245, 247, 250);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
      
      // Add decorative border
      doc.setDrawColor(0, 128, 128);
      doc.setLineWidth(3);
      doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
      
      // Add inner border
      doc.setDrawColor(70, 160, 160);
      doc.setLineWidth(1);
      doc.rect(15, 15, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 30);
      
      // Add title
      try {
        doc.setFont("helvetica", "bold");
      } catch (e) {
        // Fallback if "helvetica" font is not available
        doc.setFont("Helvetica", "bold");
      }
      doc.setFontSize(28);
      doc.setTextColor(0, 100, 100);
      doc.text(t("donations.certificate.pdfTitle") || "DONATION CERTIFICATE", doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });
      
      // Add logo or icon placeholder
      doc.setDrawColor(0, 128, 128);
      doc.setFillColor(230, 250, 250);
      doc.circle(doc.internal.pageSize.getWidth() / 2, 65, 12, 'FD');
      try {
        doc.setFont("helvetica", "bold");
      } catch (e) {
        doc.setFont("Helvetica", "bold");
      }
      doc.setFontSize(16);
      doc.setTextColor(0, 100, 100);
      doc.text("ASHA", doc.internal.pageSize.getWidth() / 2, 67, { align: "center" });
      
      // Add certificate content
      try {
        doc.setFont("helvetica", "normal");
      } catch (e) {
        doc.setFont("Helvetica", "normal");
      }
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      
      const contentText = t("donations.certificate.pdfContent") || 
        "This is to certify that";
      doc.text(contentText, doc.internal.pageSize.getWidth() / 2, 90, { align: "center" });
      
      // Add donor name
      try {
        doc.setFont("helvetica", "bold");
      } catch (e) {
        doc.setFont("Helvetica", "bold");
      }
      doc.setFontSize(18);
      doc.setTextColor(0, 100, 100);
      doc.text(donationName || t("common.user"), doc.internal.pageSize.getWidth() / 2, 105, { align: "center" });
      
      // Add donation details
      try {
        doc.setFont("helvetica", "normal");
      } catch (e) {
        doc.setFont("Helvetica", "normal");
      }
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      
      // Sanitize donation text to ensure compatibility with PDF
      let donationText = t("donations.certificate.pdfDonation", { amount }) || 
        `has generously donated Rs.${amount} to the disaster relief efforts`;
      // Replace ₹ symbol with Rs. to avoid encoding issues
      donationText = donationText.replace("₹", "Rs.");
      doc.text(donationText, doc.internal.pageSize.getWidth() / 2, 120, { align: "center" });
      
      // Add date
      const dateText = t("donations.certificate.pdfDate", { date: donationDate }) || 
        `on ${donationDate}`;
      doc.text(dateText, doc.internal.pageSize.getWidth() / 2, 135, { align: "center" });
      
      // Add thank you message
      try {
        doc.setFont("helvetica", "italic");
      } catch (e) {
        doc.setFont("Helvetica", "italic");
      }
      doc.setFontSize(14);
      const thankYouText = t("donations.certificate.pdfThanks") || 
        "Your contribution helps provide essential relief to disaster-affected communities.";
      // Calculate maximum width to prevent overflow
      const maxWidth = doc.internal.pageSize.getWidth() - 40; // Leave 20mm margin on each side
      doc.text(thankYouText, doc.internal.pageSize.getWidth() / 2, 155, { 
        align: "center", 
        maxWidth: maxWidth
      });
      
      // Add certificate ID and verification
      try {
        doc.setFont("helvetica", "normal");
      } catch (e) {
        doc.setFont("Helvetica", "normal");
      }
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const certIdText = t("donations.certificate.pdfCertId", { id: certificateId }) || 
        `Certificate ID: ${certificateId}`;
      doc.text(certIdText, doc.internal.pageSize.getWidth() / 2, 175, { align: "center" });
      
      // Add signature placeholder
      try {
        doc.setFont("helvetica", "bold");
      } catch (e) {
        doc.setFont("Helvetica", "bold");
      }
      doc.setFontSize(12);
      doc.setTextColor(0, 100, 100);
      doc.text("_______________________", 70, 190);
      doc.text(t("donations.certificate.pdfSignature") || "Authorized Signature", 70, 200);
      
      // Add organization stamp placeholder
      doc.setDrawColor(0, 128, 128);
      doc.setLineWidth(0.5);
      doc.circle(220, 190, 15);
      try {
        doc.setFont("helvetica", "italic");
      } catch (e) {
        doc.setFont("Helvetica", "italic");
      }
      doc.setFontSize(8);
      doc.text(t("donations.certificate.pdfStamp") || "Official Stamp", 220, 200, { align: "center" });
      
      // Generate and download the PDF
      try {
        doc.save(`donation_certificate_${certificateId}.pdf`);
      } catch (e) {
        console.error("Error saving PDF:", e);
        // Fallback method if save fails
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `donation_certificate_${certificateId}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }
      
      toast({
        title: t("donations.certificate.downloadSuccess"),
        description: t("donations.certificate.description")
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: t("donations.certificate.downloadError") || "Download Error",
        description: t("donations.certificate.downloadErrorMsg") || "There was a problem generating your certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/citizen/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> {t("navigation.backToDashboard")}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">{t("donations.title")}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="donate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="donate">{t("donations.tabs.monetary")}</TabsTrigger>
            <TabsTrigger value="camps">{t("donations.tabs.camps")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donate" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("donations.monetary.title")}</CardTitle>
                  <CardDescription>
                    {t("donations.monetary.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">{t("donations.monetary.amountLabel")}</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder={t("donations.monetary.amountPlaceholder")}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setAmount("100")}
                    >
                      ₹100
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setAmount("500")}
                    >
                      ₹500
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setAmount("1000")}
                    >
                      ₹1000
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("donations.monetary.nameLabel")}</Label>
                    <Input 
                      id="name" 
                      placeholder={t("donations.monetary.namePlaceholder")}
                      value={donationName}
                      onChange={(e) => setDonationName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("donations.monetary.emailLabel")}</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder={t("donations.monetary.emailPlaceholder")}
                      value={donationEmail}
                      onChange={(e) => setDonationEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("donations.monetary.phoneLabel")}</Label>
                    <Input 
                      id="phone" 
                      placeholder={t("donations.monetary.phonePlaceholder")}
                      value={donationPhone}
                      onChange={(e) => setDonationPhone(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={handleDonation}
                    disabled={isProcessing}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {isProcessing ? t("common.processing") : t("donations.monetary.donateButton")}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("donations.impact.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{t("donations.impact.families.title")}</p>
                          <p className="text-sm text-gray-600">
                            {t("donations.impact.families.description")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{t("donations.impact.medical.title")}</p>
                          <p className="text-sm text-gray-600">
                            {t("donations.impact.medical.description")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{t("donations.impact.tax.title")}</p>
                          <p className="text-sm text-gray-600">
                            {t("donations.impact.tax.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {hasCertificate && (
                  <Card className="border-green-100 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-700">{t("donations.certificate.title")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-green-700">
                      <p>{t("donations.certificate.message")}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleDownloadCertificate}
                        disabled={isGeneratingPdf}
                      >
                        {isGeneratingPdf 
                          ? <span className="animate-pulse">{t("donations.certificate.generatingPdf") || "Generating PDF..."}</span>
                          : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              {t("donations.certificate.downloadButton")}
                            </>
                          )}
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="camps" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("donations.camps.title")}</CardTitle>
                <CardDescription>
                  {t("donations.camps.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: t("donations.camps.locations.central.name"),
                      address: t("donations.camps.locations.central.address"),
                      items: t("donations.camps.locations.central.items"),
                      timing: t("donations.camps.locations.central.timing"),
                      distance: "1.2 km"
                    },
                    {
                      name: t("donations.camps.locations.sports.name"),
                      address: t("donations.camps.locations.sports.address"),
                      items: t("donations.camps.locations.sports.items"),
                      timing: t("donations.camps.locations.sports.timing"),
                      distance: "2.8 km"
                    },
                    {
                      name: t("donations.camps.locations.school.name"),
                      address: t("donations.camps.locations.school.address"),
                      items: t("donations.camps.locations.school.items"),
                      timing: t("donations.camps.locations.school.timing"),
                      distance: "3.5 km"
                    }
                  ].map((camp, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{camp.name}</h3>
                        <span className="text-sm text-green-600">{camp.distance}</span>
                      </div>
                      <div className="flex items-start space-x-2 mt-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{camp.address}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm"><strong>{t("donations.camps.itemsNeeded")}:</strong> {camp.items}</p>
                        <p className="text-sm"><strong>{t("donations.camps.timings")}:</strong> {camp.timing}</p>
                      </div>
                      <div className="mt-3">
                        <Button size="sm">{t("donations.camps.directionsButton")}</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}