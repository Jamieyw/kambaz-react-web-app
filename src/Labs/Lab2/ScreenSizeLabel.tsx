import "./index.css";

export default function ScreenSizeLabel() {
  return (
    <div id="wd-screen-size-label">
      <div className="d-block d-sm-none">
        {/* d-block = display:block (visible as a block element) */}
        {/* d-sm-none = display:none for small screens and up (≥576px) */}
        {/* &lt; is the HTML entity for < character */}
        XS - Extra Small (&lt;576px)
      </div>

      <div className="d-none d-sm-block d-md-none">
        {/* 
          This div uses Bootstrap display utilities:
          - d-none: hidden by default on all screen sizes (display:none)
          - d-sm-block: visible (display:block) on small screens (≥576px)
          - d-md-none: hidden again (display:none) on medium screens and up (≥768px)
          Combined effect: Only visible on small screens (≥576px and <768px)
        */}
        S - Small (&gt;576px)
      </div>

      <div className="d-none d-md-block d-lg-none">
        M - Medium (&gt;768px)
      </div>

      <div className="d-none d-lg-block d-xl-none">
        L - Large(&gt;992px)
      </div>

      <div className="d-none d-xl-block d-xxl-none">
        XL - Extra Large (&gt;1200px)
      </div>

      <div className="d-none d-xxl-block">
        XXL - Extra Extra Large (&gt;1400px)
      </div>
    </div>
  );
}