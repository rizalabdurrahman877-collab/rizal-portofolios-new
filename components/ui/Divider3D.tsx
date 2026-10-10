/**
 * Pembatas antar-section bergaya 3D: kubus kaca berputar + dua cincin orbit
 * di antara dua garis yang dialiri cahaya. Server component (tanpa JS);
 * rotasi mengikuti scroll diatur oleh StormEffects.tsx.
 */
export default function Divider3D() {
  return (
    <div className="d3" aria-hidden="true" role="presentation">
      <span className="d3-line" />
      <div className="d3-scene">
        <div className="d3-cube">
          <i className="d3-face" />
          <i className="d3-face" />
          <i className="d3-face" />
          <i className="d3-face" />
          <i className="d3-face" />
          <i className="d3-face" />
        </div>
        <i className="d3-ring d3-ring--1" />
        <i className="d3-ring d3-ring--2" />
      </div>
      <span className="d3-line d3-line--r" />
    </div>
  );
}