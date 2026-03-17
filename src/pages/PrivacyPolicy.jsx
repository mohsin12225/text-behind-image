import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const appName = "Text Behind Image";
  const contactEmail = "your-email@example.com"; // ← REPLACE
  const lastUpdated = "January 2025";

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <Link to="/" className="privacy-back">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Editor
        </Link>

        <h1>Privacy Policy</h1>
        <p className="privacy-updated">Last updated: {lastUpdated}</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>{appName}</strong>. Your privacy is important to
            us. This Privacy Policy explains how we collect, use, and protect
            your information when you visit our website.
          </p>
        </section>

        <section>
          <h2>2. No Server-Side Image Storage</h2>
          <p>
            <strong>{appName}</strong> operates <strong>100% client-side</strong>
            . All image processing, AI segmentation, and text rendering happen
            entirely within your web browser.
          </p>
          <ul>
            <li>
              We do <strong>NOT</strong> upload, transmit, or store any images
              you use with our tool on any server.
            </li>
            <li>
              Your images never leave your device. Once you close or refresh the
              page, all image data is discarded from browser memory.
            </li>
            <li>
              We have no access to your photos, edits, or downloaded files.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Cookies and Advertising</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on
            our website. Google AdSense may use cookies and similar technologies
            to serve ads based on your prior visits to this or other websites.
          </p>

          <h3>3.1 What are cookies?</h3>
          <p>
            Cookies are small text files stored on your device by your web
            browser. They help websites remember information about your visit.
          </p>

          <h3>3.2 How Google uses cookies for advertising</h3>
          <ul>
            <li>
              Google uses the <strong>DoubleClick cookie</strong> to serve ads
              based on your visit to this site and/or other sites on the
              Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              You can also opt out of third-party vendor cookies by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.aboutads.info/choices
              </a>
              .
            </li>
          </ul>

          <h3>3.3 Third-party vendors</h3>
          <p>
            Third-party ad networks and vendors, including Google, use cookies to
            serve ads based on a user&apos;s previous visits. We do not have
            direct control over the cookies placed by these third parties.
          </p>
        </section>

        <section>
          <h2>4. Analytics</h2>
          <p>
            We may use privacy-friendly analytics tools to understand general
            traffic patterns (e.g., page views, country-level traffic). We do
            not track individual users or collect personally identifiable
            information through analytics.
          </p>
        </section>

        <section>
          <h2>5. Data We Collect</h2>
          <p>
            We collect <strong>no personal data</strong> directly. The only data
            collection that occurs is through:
          </p>
          <ul>
            <li>
              <strong>Google AdSense cookies</strong> (as described above)
            </li>
            <li>
              <strong>Standard server logs</strong> maintained by our hosting
              provider (e.g., IP addresses, browser type, access times), which
              are retained for security purposes and automatically deleted.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Children&apos;s Privacy</h2>
          <p>
            Our service is not directed to children under the age of 13. We do
            not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </section>

        <div className="privacy-footer-link">
          <Link to="/" className="btn btn--primary">
            Back to {appName}
          </Link>
        </div>
      </div>
    </div>
  );
}