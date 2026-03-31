import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .err-root {
          min-height: 100vh;
          background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 55%, #0f172a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ambient glows */
        .err-root::before {
          content: '';
          position: absolute;
          top: -15%;
          left: -10%;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 68%);
          pointer-events: none;
        }
        .err-root::after {
          content: '';
          position: absolute;
          bottom: -15%;
          right: -8%;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(30,58,138,0.18) 0%, transparent 68%);
          pointer-events: none;
        }

        /* floating grid lines */
        .err-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* card */
        .err-card {
          position: relative;
          z-index: 2;
          max-width: 520px;
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(124,58,237,0.22);
          border-radius: 24px;
          padding: 56px 48px 48px;
          text-align: center;
          backdrop-filter: blur(18px);
          animation: err-rise 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }

        .err-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.55), transparent);
          border-radius: 24px 24px 0 0;
        }

        @keyframes err-rise {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }

        /* big 505 */
        .err-code-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 8px;
        }

        .err-code-bg {
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 22vw, 148px);
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, rgba(30,58,138,0.18), rgba(124,58,237,0.18));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -4px;
          user-select: none;
          display: block;
        }

        .err-code-line {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #7c3aed, #1e3a8a, transparent);
          border-radius: 99px;
        }

        /* badge */
        .err-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffd166;
          background: rgba(255,209,102,0.1);
          border: 1px solid rgba(255,209,102,0.22);
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 20px;
        }

        .err-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffd166;
          animation: err-pulse 1.8s ease-in-out infinite;
        }

        @keyframes err-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* heading */
        .err-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 12px;
          line-height: 1.2;
        }

        .err-heading span {
          background: linear-gradient(135deg, #a78bfa, #c7d2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* subtitle */
        .err-sub {
          font-size: 14px;
          color: #64748b;
          line-height: 1.65;
          max-width: 360px;
          margin: 0 auto 36px;
        }

        /* url pill */
        .err-url-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-family: 'DM Mono', monospace, 'DM Sans', sans-serif;
          color: #94a3b8;
          background: rgba(15,23,42,0.6);
          border: 1px solid rgba(124,58,237,0.2);
          padding: 7px 16px;
          border-radius: 8px;
          margin-bottom: 36px;
          word-break: break-all;
          max-width: 100%;
        }

        .err-url-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          opacity: 0.5;
        }

        /* divider */
        .err-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent);
          margin: 0 0 32px;
        }

        /* buttons */
        .err-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .err-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          letter-spacing: 0.02em;
        }

        .err-btn:hover {
          transform: translateY(-2px);
        }

        .err-btn:active {
          transform: translateY(0);
        }

        .err-btn-primary {
          background: linear-gradient(135deg, #1e3a8a, #7c3aed);
          color: #fff;
        }

        .err-btn-primary:hover {
          box-shadow: 0 8px 24px rgba(124,58,237,0.38);
          opacity: 0.92;
        }

        .err-btn-secondary {
          background: rgba(255,255,255,0.05);
          color: #c7d2fe;
          border: 1px solid rgba(124,58,237,0.25);
        }

        .err-btn-secondary:hover {
          background: rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.45);
        }

        /* btn icons */
        .err-btn svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }

        /* footer note */
        .err-footer {
          margin-top: 32px;
          font-size: 12px;
          color: #334155;
          letter-spacing: 0.04em;
        }

        /* responsive */
        @media (max-width: 480px) {
          .err-card { padding: 40px 24px 36px; }
          .err-actions { flex-direction: column; }
          .err-btn { justify-content: center; }
        }
      `}</style>

      <div className="err-root">
        <div className="err-grid" />

        <div className="err-card">

          {/* Big code */}
          <div className="err-code-wrap">
            <span className="err-code-bg">505</span>
            <div className="err-code-line" />
          </div>

          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
            <div className="err-badge">
              <div className="err-badge-dot" />
              Page not available
            </div>
          </div>

          {/* Heading */}
          <h1 className="err-heading">
            Oops! <span>Wrong Route</span>
          </h1>

          {/* Subtitle */}
          <p className="err-sub">
            The page you're looking for doesn't exist or has been moved.
            Double-check the URL or head back to safety.
          </p>

          {/* Current URL pill */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="err-url-pill">
              <svg className="err-url-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" stroke="#94a3b8" strokeWidth="1.2"/>
                <path d="M8 2c0 0-2.5 2.5-2.5 6S8 14 8 14M8 2s2.5 2.5 2.5 6S8 14 8 14M2.5 6h11M2.5 10h11" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {typeof window !== "undefined" ? window.location.pathname : "/unknown-route"}
            </div>
          </div>

          <div className="err-divider" />

          {/* Actions */}
          <div className="err-actions">
            <button
              className="err-btn err-btn-primary"
              onClick={() => window.history.back()}
            >
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Go Back
            </button>

            <button
              className="err-btn err-btn-secondary"
              onClick={() => window.location.replace("/")}
            >
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8h12M8 3l5 5-5 5" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Go to Home
            </button>
          </div>

          {/* Footer note */}
          <p className="err-footer">Error 505 · HTTP Version Not Supported</p>

        </div>
      </div>
    </>
  )
}