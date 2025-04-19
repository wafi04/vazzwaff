"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createMethod, type CreateMethod } from "@/schemas/methods";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Wallet,
  ImageIcon,
  ToggleRight,
  BanknoteIcon as BankIcon,
  CurrencyIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Step1Basic } from "./form/form-step-1";
import { Step2Payment } from "./form/form-step-2";
import { Step3AdminFee } from "./form/form-step-3";
import { Step4Image } from "./form/form-step-4";
import { Step5Status } from "./form/form-step-5";

export function FormMethods({
  onSubmit,
  initialData,
  isLoading = false,
}: {
  onSubmit: (data: CreateMethod) => void;
  initialData?: Partial<CreateMethod>;
  isLoading?: boolean;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState<Partial<CreateMethod>>(
    initialData || {}
  );

  const form = useForm<CreateMethod>({
    resolver: zodResolver(createMethod),
    defaultValues: {
      name: initialData?.name || "",
      images: initialData?.images || "",
      code: initialData?.code || "",
      keterangan: initialData?.keterangan || "",
      tipe: initialData?.tipe || "BANK_TRANSFER",
      min: initialData?.min || 10000,
      isActive: initialData?.isActive ?? false,
      typeTax: initialData?.typeTax || null,
      taxAdmin: initialData?.taxAdmin || null,
      minExpired: initialData?.minExpired || null,
      maxExpired: initialData?.maxExpired || null,
      max: initialData?.max || null,
    },
  });

  const nextStep = () => {
    if (step === 4) {
      form.setValue("images", formData.images || "", { shouldValidate: false });
      setStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
      return;
    }

    const fieldsToValidate = getFieldsForStep(step);
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setStep((prev) => Math.min(prev + 1, totalSteps));
        window.scrollTo(0, 0);
      }
    });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const goToStep = (stepNumber: number) => {
    if (step === 4) {
      form.setValue("images", formData.images || "", { shouldValidate: false });
    }
    setStep(stepNumber);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (data: CreateMethod) => {
    if (step === 5 && formData.images) {
      data.images = formData.images;
    }
    onSubmit(data);
  };

  const getFieldsForStep = (stepNumber: number): (keyof CreateMethod)[] => {
    switch (stepNumber) {
      case 1:
        return ["name", "code", "tipe", "keterangan"];
      case 2:
        return ["min", "max", "minExpired", "maxExpired"];
      case 3:
        return ["typeTax", "taxAdmin"];
      case 4:
        return ["images"];
      case 5:
        return ["isActive"];
      default:
        return [];
    }
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <BankIcon className="h-5 w-5" />;
      case 2:
        return <CurrencyIcon className="h-5 w-5" />;
      case 3:
        return <Wallet className="h-5 w-5" />;
      case 4:
        return <ImageIcon className="h-5 w-5" />;
      case 5:
        return <ToggleRight className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderStepTitle = () => {
    switch (step) {
      case 1:
        return "Informasi Dasar";
      case 2:
        return "Pengaturan Pembayaran";
      case 3:
        return "Pengaturan Biaya Admin";
      case 4:
        return "Upload Gambar";
      case 5:
        return "Status Metode";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1Basic form={form} />;
      case 2:
        return <Step2Payment form={form} />;
      case 3:
        return <Step3AdminFee form={form} />;
      case 4:
        return <Step4Image form={form} setFormData={setFormData} />;
      case 5:
        return <Step5Status form={form} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (step !== 4) {
        setFormData((prev) => ({ ...prev, ...value }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, step]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <Card className="w-full shadow-md">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center text-xl">
              <CreditCard className="mr-2 h-5 w-5" />
              Detail Metode Pembayaran
            </CardTitle>
          </CardHeader>
          <div className="flex flex-wrap md:flex-nowrap border-b">
            {/* Step navigation sidebar */}
            <div className="w-full md:w-64 md:border-r bg-muted/30">
              <nav className="p-4">
                <ul className="space-y-1">
                  {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNum = i + 1;
                    const isActive = step === stepNum;
                    const isCompleted =
                      form.formState.touchedFields &&
                      getFieldsForStep(stepNum).some((field) =>
                        Object.keys(form.formState.touchedFields).includes(
                          field as string
                        )
                      );
                    return (
                      <li key={`step-${stepNum}`}>
                        <button
                          type="button"
                          onClick={() => goToStep(stepNum)}
                          className={cn(
                            "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground font-medium"
                              : isCompleted
                              ? "bg-muted/80 text-foreground hover:bg-muted"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center h-6 w-6 rounded-full mr-2 text-xs",
                              isActive
                                ? "bg-primary-foreground text-primary"
                                : isCompleted
                                ? "bg-primary/20 text-primary"
                                : "bg-muted-foreground/30 text-muted-foreground"
                            )}
                          >
                            {stepNum}
                          </div>
                          <span className="flex-1 text-left">
                            {renderStepTitle()}
                          </span>
                          {getStepIcon(stepNum)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            {/* Form content */}
            <div className="flex-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="mr-3">{getStepIcon(step)}</div>
                  <div>
                    <h3 className="text-lg font-medium">{renderStepTitle()}</h3>
                    <p className="text-sm text-muted-foreground">
                      Langkah {step} dari {totalSteps}
                    </p>
                  </div>
                </div>
                <Separator className="mb-6" />
                {renderStepContent()}
              </CardContent>
              <CardFooter className="flex justify-between p-6 border-t bg-muted/20">
                <div>
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  {step < totalSteps && (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center"
                    >
                      Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                  {step === totalSteps && (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center"
                      onClick={() => {
                        if (formData.images) {
                          form.setValue("images", formData.images, {
                            shouldValidate: false,
                          });
                        }
                      }}
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Metode"}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </form>
    </Form>
  );
}
