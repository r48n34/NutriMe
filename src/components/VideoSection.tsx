const videos = [
  {
    label: "INTRODUCING NUTRIME",
    title: "Meet NutriMe",
    file: "EC5001 Progress Presentation Slides.pptx.mp4",
  },
  {
    label: "FEATURE HIGHLIGHTS",
    title: "Your plan, at a glance",
    file: "EC5001 Progress Presentation Slides.pptx (1).mp4",
  },
];

export function VideoSection() {
  return (
    <section className="landing-section video-section" id="videos" aria-labelledby="videos-title">
      <div className="center-intro">
        <h2 id="videos-title">
          Watch NutriMe <em>in action.</em>
        </h2>
      </div>
      <div className="video-grid">
        {videos.map(({ label, title, file }, index) => (
          <figure className="video-card" key={file}>
            <video controls playsInline preload="metadata" aria-labelledby={`video-title-${index}`}>
              <source src={encodeURI(`/${file}`)} type="video/mp4" />
              Your browser doesn’t support embedded video.{" "}
              <a href={encodeURI(`/${file}`)}>Watch {title}</a>.
            </video>
            <figcaption>
              <span className="eyebrow">{label}</span>
              <h3 id={`video-title-${index}`}>{title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
