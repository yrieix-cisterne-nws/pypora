function TextBlock({ value }) {
  return <p className="text-gray-700 text-sm leading-relaxed">{value}</p>;
}

function ImageBlock({ src, alt }) {
  return (
    <figure className="my-2">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl border border-gray-200 object-cover"
      />
    </figure>
  );
}

function toEmbedUrl(url) {
  try {
    const u = new URL(url);
    const isYouTube =
      u.hostname === "www.youtube.com" ||
      u.hostname === "youtube.com" ||
      u.hostname === "youtu.be";
    if (!isYouTube) return null;
    if (u.hostname === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (u.pathname.startsWith("/embed/")) return url;
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
  } catch { /* not a valid URL */ }
  return null;
}

function VideoBlock({ url, caption }) {
  const embedUrl = toEmbedUrl(url);
  if (!embedUrl) {
    return (
      <p className="text-xs text-red-400 italic">URL vidéo invalide (YouTube uniquement).</p>
    );
  }
  return (
    <figure className="my-2">
      <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-black" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          title={caption}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

export default function ContentBlock({ block }) {
  switch (block.type) {
    case "text":  return <TextBlock value={block.value} />;
    case "image": return <ImageBlock src={block.src} alt={block.alt} />;
    case "video": return <VideoBlock url={block.url} caption={block.caption} />;
    default:      return null;
  }
}
