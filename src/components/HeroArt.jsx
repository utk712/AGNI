// Custom botanical illustration for the hero -- a corked glass bottle with a
// rose sprig, standing in for a product photo. Keeps the whole page free of
// external image dependencies and gives the brand a consistent, hand-drawn feel.
function HeroArt(props) {
  return (
    <svg viewBox="0 0 420 460" width="100%" height="100%" {...props}>
      <ellipse cx="210" cy="430" rx="140" ry="18" fill="var(--petal)" opacity="0.6" />

      {/* bottle */}
      <path
        d="M170 140h80v40c26 20 40 46 40 86v130a20 20 0 0 1-20 20H150a20 20 0 0 1-20-20V266c0-40 14-66 40-86Z"
        fill="var(--ivory-soft)"
        stroke="var(--rosewood)"
        strokeWidth="3"
      />
      <rect x="182" y="96" width="56" height="48" rx="8" fill="var(--ivory-soft)" stroke="var(--rosewood)" strokeWidth="3" />
      <rect x="176" y="82" width="68" height="20" rx="6" fill="var(--rosewood)" />

      {/* liquid */}
      <path
        d="M138 300v56a20 20 0 0 0 20 20h104a20 20 0 0 0 20-20v-56Z"
        fill="var(--petal)"
        opacity="0.9"
      />

      {/* label */}
      <rect x="158" y="250" width="104" height="64" rx="10" fill="var(--white)" stroke="var(--line)" strokeWidth="2" />
      <text x="210" y="278" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fill="var(--rosewood)">
        AGN
      </text>
      <text x="210" y="298" textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" letterSpacing="1.5" fill="var(--ink-soft)">
        ROSE WATER
      </text>

      {/* rose sprig */}
      <g stroke="var(--moss)" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M300 120c10 60-10 110-70 150" />
        <path d="M270 170c20-6 34 2 40 18" />
        <path d="M250 210c18-8 34-2 42 12" />
      </g>
      <g>
        <circle cx="300" cy="112" r="16" fill="var(--rosewood)" opacity="0.9" />
        <circle cx="300" cy="112" r="7" fill="var(--petal)" />
        <circle cx="330" cy="150" r="11" fill="var(--rosewood)" opacity="0.75" />
        <circle cx="330" cy="150" r="5" fill="var(--petal)" />
      </g>

      {/* falling petals */}
      <g fill="var(--rosewood)" opacity="0.55">
        <ellipse cx="110" cy="150" rx="7" ry="10" transform="rotate(-20 110 150)" />
        <ellipse cx="95" cy="200" rx="6" ry="9" transform="rotate(15 95 200)" />
        <ellipse cx="330" cy="230" rx="6" ry="9" transform="rotate(30 330 230)" />
      </g>
    </svg>
  );
}

export default HeroArt;
