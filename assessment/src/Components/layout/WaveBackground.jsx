
export default function WaveBackground() {
  return (
    <div className="wave-background">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path
          fill="#0f5555"
          d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1400,100 1440,50 1440,50 L1440,150 L0,150 Z"
        />
        <path
          fill="#0a4545"
          d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 C1400,120 1440,80 1440,80 L1440,150 L0,150 Z"
        />
      </svg>
    </div>
  );
}
