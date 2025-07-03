import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How do I know if a professional is qualified?",
      answer:
        "All professionals on TaskLink go through a verification process including background checks, skill assessments, and document verification. Look for the verified badge on their profiles.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "We offer a satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours and we'll work to resolve the issue or provide a refund.",
    },
    {
      question: "How does payment work?",
      answer:
        "Payment is processed securely through our platform. You can pay by card, bank transfer, or mobile money. Payment is only released to the professional after you confirm the job is completed satisfactorily.",
    },
    {
      question: "Can I cancel a booking?",
      answer:
        "Yes, you can cancel a booking up to 4 hours before the scheduled time without penalty. Cancellations within 4 hours may incur a small fee.",
    },
    {
      question: "How do I become a verified professional?",
      answer:
        "To become verified, complete your profile, upload required documents (ID, certifications), and pass our background check. The verification process typically takes 24-48 hours.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve major cities across Nigeria, Ghana, Kenya, and South Africa. We're expanding to more locations regularly.",
    },
    {
      question: "Is there a minimum booking amount?",
      answer:
        "The minimum booking amount varies by service type and location. Most services have a minimum of 1 hour booking.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team through the app, website chat, email at support@tasklinkafrica.com, or phone at +234 800 TASKLINK.",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Find answers to common questions about using TaskLink.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
