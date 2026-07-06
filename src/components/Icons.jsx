// Shared line-art icon set for Akshaya Glow Naturals.
// Kept as one file so every icon shares the same stroke weight and style.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Leaf(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M4 20c0-8 4-14 15-15-1 11-7 15-15 15Z" />
      <path d="M6 18c3-4 6-7 12-11" />
    </svg>
  );
}

export function Droplet(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M12 3c3.5 4.2 6 7.6 6 11a6 6 0 1 1-12 0c0-3.4 2.5-6.8 6-11Z" />
    </svg>
  );
}

export function HandHeart(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M4 13.5V20a2 2 0 0 0 2 2h6.5a3 3 0 0 0 2.1-.9l6-6a1.5 1.5 0 0 0-2.1-2.1L14 17" />
      <path d="M4 13.5 6 12a3 3 0 0 1 2.6-.4l4 1.2a1.6 1.6 0 0 1-.9 3.1L9 15" />
      <path d="M12 3.8c.8-1 2.6-1.2 3.5 0 .9 1.1.7 2.4-.4 3.4L12 10 8.9 7.2c-1.1-1-1.3-2.3-.4-3.4.9-1.2 2.7-1 3.5 0Z" />
    </svg>
  );
}

export function Tag(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M3 11.5 12.5 2H20a1 1 0 0 1 1 1v7.5L11.5 21 3 12.5Z" />
      <circle cx="15.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Menu(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function WhatsApp(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.2.4.9 3.2-3.3-.9-.4.2A8.2 8.2 0 1 1 12 3.8Zm-3.4 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.6-.9-2.2-.2-.5-.4-.5-.6-.5Z" />
    </svg>
  );
}

export function Phone(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M5 4h3.2l1.3 4.2-2 1.6a13 13 0 0 0 6.7 6.7l1.6-2 4.2 1.3V19a2 2 0 0 1-2.1 2C10.3 20.6 3.4 13.7 3 6.1A2 2 0 0 1 5 4Z" />
    </svg>
  );
}

export function Mail(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

/** Circular "ingredient stamp" -- the product badge motif used across the site. */
export function IngredientStamp({ kind, ...rest }) {
  const marks = {
    rose: (
      <>
        <circle cx="12" cy="12" r="2.6" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="12"
            cy="7.3"
            rx="1.7"
            ry="3"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
      </>
    ),
    beet: (
      <>
        <path d="M12 6c3 0 5 2.6 5 6.2 0 3.5-2.3 6.3-5 6.3s-5-2.8-5-6.3C7 8.6 9 6 12 6Z" />
        <path d="M12 6c.6-1.4 1-2.6.6-3.6M10.7 6.2c-.2-1.4 0-2.6.7-3.5M13.3 6.2c.4-1 1.3-1.7 2.3-1.9" />
      </>
    ),
    grain: (
      <>
        <path d="M8 16c-1.5-3.5-.5-7 4-10.5C13.6 9 14.8 12.6 12.6 16 11 18.2 9.3 18.2 8 16Z" />
        <path d="M9.3 9.8c1.4.5 2.7 1.5 3.4 2.9" />
      </>
    ),
    herbal: (
      <>
        <path d="M12 18c0-5.2 1.8-8.6 5.5-10.4-.4 5.6-2.4 9-5.5 10.4Z" />
        <path d="M12 18c0-5-1.8-8.2-5.2-10 .3 5.4 2.2 8.7 5.2 10Z" />
      </>
    ),
    lip: (
      <>
        <path d="M6.5 11c1-1.4 2.6-2 5.5-2s4.5.6 5.5 2c.6.9-.2 1.8-1.4 1.6-1.4-.2-2.6-.6-4.1-.6s-2.7.4-4.1.6c-1.2.2-2-.7-1.4-1.6Z" />
        <path d="M7 12.2c.6 2 2.4 3.3 5 3.3s4.4-1.3 5-3.3" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...rest}>
      <circle cx="12" cy="12" r="10.2" strokeDasharray="2.2 2.4" opacity="0.55" />
      {marks[kind] ?? marks.herbal}
    </svg>
  );
}

/** Small decorative sprig used as a section divider mark -- used sparingly. */
export function Sprig(props) {
  return (
    <svg viewBox="0 0 60 20" width="60" height="20" {...base} {...props}>
      <path d="M2 10h22M36 10h22" />
      <path d="M30 10c-3-3-3-6 0-8 3 2 3 5 0 8Z" />
      <path d="M30 10c-3 3-3 6 0 8 3-2 3-5 0-8Z" />
    </svg>
  );
}
