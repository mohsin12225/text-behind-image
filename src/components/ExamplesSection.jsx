import React from "react";

const EXAMPLES = [
  {
    id: 1,
    src: "/examples/example1.png",
    title: "Marketing and advertising products",
    desc: "Bold text behind a person for eye-catching video covers",
  },
  {
    id: 2,
    src: "/examples/example2.png",
    title: "CAR lovers",
    desc: "Stunning text effects for Instagram and TikTok content",
  },
  {
    id: 3,
    src: "/examples/example3.png",
    title: "Product Photography",
    desc: "Brand text behind products for professional marketing",
  },
  {
    id: 4,
    src: "/examples/example4.png",
    title: "Event Posters",
    desc: "Dynamic text behind performers and speakers",
  },
  {
    id: 5,
    src: "/examples/example5.png",
    title: "Blog Headers",
    desc: "Clean text effects for website banners and headers",
  },
  {
    id: 6,
    src: "/examples/example6.png",
    title: "Brand Marketing",
    desc: "Professional text-behind-subject for ad campaigns",
  },
];

function ExampleCard({ example }) {
  return (
    <div className="example-card">
      <div className="example-img-wrap">
        <img
          src={example.src}
          alt={example.title}
          className="example-img"
          loading="lazy"
          draggable="false"
        />
        <div className="example-img-overlay" />
      </div>
      <div className="example-info">
        <h3>{example.title}</h3>
        <p>{example.desc}</p>
      </div>
    </div>
  );
}

export default function ExamplesSection() {
  return (
    <section className="examples-section">
      <div className="examples-header">
        <span className="examples-badge">Examples</span>
        <h2>See the Text-Behind-Image Effect</h2>
        <p>
          Create stunning visuals where text seamlessly appears behind your
          subject. Perfect for thumbnails, social media, posters, and more.
        </p>
      </div>

      <div className="examples-grid">
        {EXAMPLES.map((ex) => (
          <ExampleCard key={ex.id} example={ex} />
        ))}
      </div>

      {/* how it works mini section */}
      <div className="examples-how">
        <h3>How does it work?</h3>
        <div className="examples-how-steps">
          <div className="examples-how-step">
            <div className="examples-how-num">1</div>
            <div className="examples-how-content">
              <strong>Upload</strong>
              <span>Drop any photo</span>
            </div>
          </div>
          <div className="examples-how-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className="examples-how-step">
            <div className="examples-how-num">2</div>
            <div className="examples-how-content">
              <strong>AI Detects</strong>
              <span>Subject isolated</span>
            </div>
          </div>
          <div className="examples-how-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className="examples-how-step">
            <div className="examples-how-num">3</div>
            <div className="examples-how-content">
              <strong>Add Text</strong>
              <span>Customize freely</span>
            </div>
          </div>
          <div className="examples-how-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className="examples-how-step">
            <div className="examples-how-num">4</div>
            <div className="examples-how-content">
              <strong>Download</strong>
              <span>Full-res PNG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}