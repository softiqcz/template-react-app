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

type ReportBugDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ReportBugDialog({
  isOpen,
  onOpenChange,
}: ReportBugDialogProps) {
  const { reportBug } = useAppContext();
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

    await reportBug(trimmedMessage);
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
                  <MyDialogTitle>Nahlaste nám chybu</MyDialogTitle>
                  <MyDialogDescription>
                    Řekněte nám, co se nepovedlo. My se na to podíváme a
                    opravíme, aby se to příště nestalo.
                  </MyDialogDescription>
                </MyDialogHeaderText>
                <MyDialogCloseButton
                  aria-label="Close bug report"
                  onClick={handleCancel}
                />
              </MyDialogHeader>

              <Textarea
                aria-label="Message"
                placeholder="Vaše zpráva"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </MyDialogContent>

            <MyDialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Zrušit
              </Button>
              <Button type="submit" disabled={!message.trim()}>
                Odeslat
              </Button>
            </MyDialogFooter>
          </form>
        </MyDialogSurface>
      </MyDialogContainer>
    </MyDialog>
  );
}
