import "./index.css";

export default function ForegroundColors() {
  return (
    <div id="ws-css-colors">
      <h2>Colors</h2>
      <h3 className="wd-fg-color-blue">Foreground color</h3>
      <p className="wd-fg-color-red">
        The text in this paragraph is red&nbsp;
        <span className="wd-fg-color-green">this text is green</span>
      </p>
    </div>
  );
}
