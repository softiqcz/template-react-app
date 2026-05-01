"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

import { ActionButton } from "@/components/ActionButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { postContactMessage } from "@/utils";
import { CONTACT_ADMIN_EMAIL } from "@/utils/constants";

const initialContactForm = {
  name: "",
  email: "",
  message: "",
};

export function ContactSection() {
  const { t } = useLanguage();
  const contact = t.home.contact;
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const isContactFormValid =
    contactForm.name.trim() &&
    contactForm.email.trim() &&
    contactForm.message.trim();

  function updateContactField(
    field: keyof typeof contactForm,
    value: string,
  ) {
    setContactForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ownerEmail: CONTACT_ADMIN_EMAIL,
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      message: contactForm.message.trim(),
      other: null,
    };

    if (!payload.name || !payload.email || !payload.message) {
      return;
    }

    setIsSubmittingContact(true);

    try {
      await postContactMessage(payload);
      setContactForm(initialContactForm);
    } finally {
      setIsSubmittingContact(false);
    }
  }

  return (
    <section className="contact-section">
      <SectionHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
        className="contact-header"
      />

      <div className="site-container">
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="contact-fields">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{contact.nameLabel}</Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder={contact.namePlaceholder}
                value={contactForm.name}
                onChange={(event) =>
                  updateContactField("name", event.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">{contact.emailLabel}</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={contact.emailPlaceholder}
                value={contactForm.email}
                onChange={(event) =>
                  updateContactField("email", event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">{contact.messageLabel}</Label>
            <Textarea
              id="contact-message"
              name="message"
              className="min-h-[8.25rem]"
              placeholder={contact.messagePlaceholder}
              value={contactForm.message}
              onChange={(event) =>
                updateContactField("message", event.target.value)
              }
              required
            />
          </div>

          <div className="contact-action">
            <ActionButton
              type="submit"
              className="w-fit"
              disabled={!isContactFormValid || isSubmittingContact}
              prompt={contact.submit}
              isLoading={isSubmittingContact}
              icon={<ArrowRightIcon className="h-4 w-4" />}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
