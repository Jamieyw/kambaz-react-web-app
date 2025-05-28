export default function Styles() {
  const colorBlack = { color: "black" };  // This JavaScript object represents a CSS style rule.
  const padding10px = { padding: "10px" };
  const bgBlue = { "backgroundColor": "lightblue", "color": "black", ...padding10px };
  const bgRed = { "backgroundColor": "lightcoral", ...colorBlack, ...padding10px };

  return (
    <div id="wd-styles">
      <h2>Styles</h2>
      <div style={
        // The outer {} indicate that you are embedding a JavaScript expression. 
        // The inner {} define a JavaScript object.
        {"backgroundColor": "lightyellow", "color": "black", padding: "10px"}}>
        Yellow background
      </div>
      <div style={ bgRed }>Red background</div>
      <div style={ bgBlue }>Blue background</div><hr />
    </div>
  );
}