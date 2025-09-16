import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Habit Streaks",
  description: "Privacy policy for Habit Streaks",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
            </p>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Profile information</li>
              <li>Habit tracking data</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>How you use our services</li>
              <li>Device information</li>
              <li>Log data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our services</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
            <p className="mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="mb-4">
              However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy.
            </p>
            <p className="mb-4">
              You may request deletion of your account and associated data at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
            </p>
            <p className="mb-4">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
            <p className="mb-4">
              Our service may integrate with third-party services (such as Strava, GitHub) to provide additional functionality.
            </p>
            <p className="mb-4">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
            <p className="mb-4">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@habitstreaks.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
