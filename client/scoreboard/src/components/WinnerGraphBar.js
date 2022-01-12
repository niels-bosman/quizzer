const WinnerGraphBar = ({ name, score, place, percentage }) => (
  <div className="m-winner-graph__place">
    <div className="m-winner-graph__medal">
      {place === 1 && `🥇`}
      {place === 2 && `🥈`}
      {place === 3 && `🥉`}
    </div>
    <div className={`m-winner-graph__bar ${place === 1 ? 'shine' : ''}`} style={{ height: `${percentage}%` }}>
      {score}
    </div>
    <div className="m-winner-graph__name">
      {name}
    </div>
  </div>
);

export default WinnerGraphBar;