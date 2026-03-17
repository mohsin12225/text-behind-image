import React from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const appName = "Text Behind Image";

  return (
    <div className="about-page">
      <div className="about-container">
        <Link to="/" className="about-back">
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

        <div className="about-hero">
          <div className="about-hero-icon">
            <span className="logo-icon logo-icon--large">T</span>
          </div>
          <h1>{appName}</h1>
          <p className="about-subtitle">
            Create stunning text-behind-image effects in seconds &mdash;
            no Photoshop required.
          </p>
        </div>

        {/* ── What is this tool ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#9889;</span>
            What is {appName}?
          </h2>
          <p>
            <strong>{appName}</strong> is a free, browser-based design tool that
            lets you place text <em>behind</em> any subject in your photo. Using
            advanced AI-powered image segmentation, the app automatically detects
            the main object in your image and layers your custom text between the
            background and the foreground subject &mdash; creating a professional
            3D depth effect instantly.
          </p>
        </section>

        {/* ── How it works ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#9881;</span>
            How It Works
          </h2>
          <div className="about-steps">
            <div className="about-step">
              <div className="about-step-num">1</div>
              <div className="about-step-content">
                <h3>Upload Your Image</h3>
                <p>
                  Drop any PNG, JPG, or WebP image into the editor. Photos with
                  a clear subject work best &mdash; people, animals, products,
                  buildings, or any prominent object.
                </p>
              </div>
            </div>

            <div className="about-step">
              <div className="about-step-num">2</div>
              <div className="about-step-content">
                <h3>AI Detects the Subject</h3>
                <p>
                  Our AI model automatically identifies and separates the main
                  subject from the background. If auto-detection fails, you can
                  manually paint a mask using the built-in brush tool.
                </p>
              </div>
            </div>

            <div className="about-step">
              <div className="about-step-num">3</div>
              <div className="about-step-content">
                <h3>Add Your Text</h3>
                <p>
                  Type your message, choose from 26+ Google Fonts, pick your
                  color, adjust size, opacity, rotation, and position. Add
                  multiple text layers for complex designs.
                </p>
              </div>
            </div>

            <div className="about-step">
              <div className="about-step-num">4</div>
              <div className="about-step-content">
                <h3>Download Your Creation</h3>
                <p>
                  Export a full-resolution PNG with one click. Your text appears
                  seamlessly behind the subject &mdash; ready for social media,
                  thumbnails, posters, or presentations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key features ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#10024;</span>
            Key Features
          </h2>
          <div className="about-features">
            <div className="about-feature-card">
              <div className="about-feature-icon">&#129302;</div>
              <h3>AI-Powered Segmentation</h3>
              <p>
                Detects any subject automatically &mdash; people, animals,
                products, vehicles, and more.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">&#127912;</div>
              <h3>Multi-Layer Text</h3>
              <p>
                Add unlimited text layers with individual fonts, colors, sizes,
                and positions.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">&#128274;</div>
              <h3>100% Private</h3>
              <p>
                Everything runs in your browser. Your images are never uploaded
                to any server.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">&#9997;</div>
              <h3>Manual Mask Editor</h3>
              <p>
                If AI detection misses, use our brush and eraser tools to
                manually paint the subject mask.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">&#127280;</div>
              <h3>26+ Google Fonts</h3>
              <p>
                Choose from a curated library of beautiful fonts, each previewed
                in its own typeface.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">&#128247;</div>
              <h3>Full-Res Export</h3>
              <p>
                Download your final image at the original resolution as a
                high-quality PNG file.
              </p>
            </div>
          </div>
        </section>

        {/* ── Use cases ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#128161;</span>
            Perfect For
          </h2>
          <ul className="about-use-cases">
            <li>YouTube thumbnails with eye-catching text effects</li>
            <li>Instagram and TikTok content creation</li>
            <li>Product photography with branding text</li>
            <li>Posters and event flyers</li>
            <li>Social media marketing graphics</li>
            <li>Blog header images and banners</li>
            <li>Presentations and pitch decks</li>
            <li>Personal creative projects</li>
          </ul>
        </section>

        {/* ── Tech ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#128187;</span>
            Built With Modern Technology
          </h2>
          <p>
            {appName} is built using cutting-edge web technologies to ensure
            speed, privacy, and reliability:
          </p>
          <div className="about-tech-list">
            <span className="about-tech-badge">React</span>
            <span className="about-tech-badge">HTML5 Canvas</span>
            <span className="about-tech-badge">AI Segmentation</span>
            <span className="about-tech-badge">Google Fonts API</span>
            <span className="about-tech-badge">Vite</span>
            <span className="about-tech-badge">Client-Side Only</span>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#10067;</span>
            Frequently Asked Questions
          </h2>

          <div className="about-faq">
            <div className="about-faq-item">
              <h3>Is this tool free to use?</h3>
              <p>
                Yes! {appName} is completely free. We sustain the project through
                non-intrusive advertisements.
              </p>
            </div>

            <div className="about-faq-item">
              <h3>Are my images stored on your servers?</h3>
              <p>
                <strong>Absolutely not.</strong> All processing happens locally
                in your browser. We never see, upload, or store your images.
                Once you close the tab, everything is gone.
              </p>
            </div>

            <div className="about-faq-item">
              <h3>What image formats are supported?</h3>
              <p>
                PNG, JPG/JPEG, and WebP. For best results, use high-resolution
                images with a clear subject.
              </p>
            </div>

            <div className="about-faq-item">
              <h3>Why did the AI not detect my subject?</h3>
              <p>
                The AI works best with photos that have a clear, distinct subject
                against a contrasting background. If auto-detection fails, use
                the &quot;Draw Mask&quot; button to manually select the subject.
              </p>
            </div>

            <div className="about-faq-item">
              <h3>Can I use the downloaded images commercially?</h3>
              <p>
                Yes. The images you create are yours. Make sure you have the
                rights to any source photos you upload.
              </p>
            </div>

            <div className="about-faq-item">
              <h3>Does it work on mobile?</h3>
              <p>
                Yes, the app is fully responsive. However, for the best editing
                experience, we recommend using a desktop or tablet.
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="about-section">
          <h2>
            <span className="about-section-icon">&#128236;</span>
            Contact Us
          </h2>
          <p>
            Have questions, feedback, or suggestions? We would love to hear from
            you!
          </p>
          <p>
            Email us at:{" "}
            <a href="mailto:your-email@example.com">mohsin.alaum10@gmail.com</a>
          </p>
        </section>

        <div className="about-footer-link">
          <Link to="/" className="btn btn--primary">
            Start Creating Now
          </Link>
          <Link to="/privacy" className="btn btn--outline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
