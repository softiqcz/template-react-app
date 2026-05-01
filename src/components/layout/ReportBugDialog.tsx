"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  MyDialog,
  MyDialogCloseButton,
  MyDialogContainer,
  MyDialogContent,
  MyDialogDescription,
  MyDialogFooter,
  MyDialogHeader,
  MyDialogHeaderText,
  MyDialogSurface,
  MyDialogTitle,
} from "@/components/ui/my-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";

type ReportBugDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ReportBugDialog({
  isOpen,
  onOpenChange,
}: ReportBugDialogProps) {
  const { reportBug: submitBugReport } = useAppContext();
  const { t } = useLanguage();
  const reportBug = t.reportBug;
  const [message, setMessage] = useState("");

  function handleCancel() {
    onOpenChange(false);
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    await submitBugReport(trimmedMessage);
    onOpenChange(false);
    setMessage("");
  }

  return (
    <MyDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <MyDialogContainer>
        <MyDialogSurface asChild>
          <form onSubmit={handleSubmit}>
            <MyDialogContent>
              <MyDialogHeader>
                <MyDialogHeaderText>
                  <MyDialogTitle>{reportBug.title}</MyDialogTitle>
                  <MyDialogDescription>
                    {reportBug.description}
                  </MyDialogDescription>
                </MyDialogHeaderText>
                <MyDialogCloseButton
                  aria-label={reportBug.close}
                  onClick={handleCancel}
                />
              </MyDialogHeader>

              <Textarea
                aria-label={reportBug.messageLabel}
                placeholder={reportBug.placeholder}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </MyDialogContent>

            <MyDialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                {reportBug.cancel}
              </Button>
              <Button type="submit" disabled={!message.trim()}>
                {reportBug.submit}
              </Button>
            </MyDialogFooter>
          </form>
        </MyDialogSurface>
      </MyDialogContainer>
    </MyDialog>
  );
}
