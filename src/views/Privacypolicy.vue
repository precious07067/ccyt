<template>
  <LandingWrapper>
    <section
      class="mt-28 lg:px-lg px-4 grid grid-cols-1 text-slight-dark gap-5"
    >
      <h3 class="text-text-sm font-semibold">
        This Privacy Policy outlines how Citi Bank collects, uses, discloses, and
        protects the personal information of its customers. By using our
        services, you agree to the terms outlined in this policy.
      </h3>
      <div>
        <ol class="list-decimal list-inside">
          <li class="mb-4" v-for="(policy, index) in policies" :key="index">
            <p class="font-bold">{{ policy.title }}</p>
            <p>
              {{ policy.explanation }}
            </p>
          </li>
        </ol>
      </div>
    </section>
  </LandingWrapper>
</template>

<script setup>
import LandingWrapper from "@/components/LandingWrapper.vue";
import { ref } from "vue";
const policies = ref([
  {
    title: "Information We Collect:",
    explanation: `
          We may collect personal information, including but not limited to,
            name, address, contact details, financial information, and
            identification documents, to provide financial services and comply
            with legal requirements.`,
  },
  {
    title: "How We Use Your Information:",
    explanation: `
      We use the collected information to process transactions, manage accounts, provide customer support, and comply with regulatory obligations. Additionally, we may use data for internal analysis and to improve our services.
  `,
  },
  {
    title: " Information Sharing:",
    explanation: `
      We do not sell your personal information to third parties. However, we may share information with affiliated entities, service providers, and regulatory bodies to fulfill our services or legal obligations.
  `,
  },
  {
    title: "Security Measures:",
    explanation: `
      We implement robust security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include encryption, access controls, and regular security audits.
  `,
  },
  {
    title: "Cookies and Tracking Technologies:",
    explanation: `
      We use cookies and similar technologies to enhance user experience, analyze usage patterns, and customize content. You can manage cookie preferences through your browser settings.
  `,
  },
  {
    title: "Your Choices:",
    explanation: `
      You have the right to access, correct, or delete your personal information. Contact our customer support for assistance. You may also choose to opt-out of certain data processing activities.
  `,
  },
  {
    title: "Marketing Communications:",
    explanation: `
      We may send you promotional communications based on your preferences. You can opt-out of receiving these communications at any time by following the instructions provided in the messages.
  `,
  },
  {
    title: " Changes to the Privacy Policy:",
    explanation: `
      We reserve the right to update this Privacy Policy. Any material changes will be communicated through our website or other appropriate channels. Your continued use of our services after changes indicate your acceptance.
  `,
  },
  {
    title: "Children’s Privacy:",
    explanation: `
      Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us to delete it.
  `,
  },
  {
    title: "Contact Information:",
    explanation: `
      For any questions or concerns regarding to this privacy policy, please contact us at info@ftsfinace.com
  `,
  },
]);
</script>
