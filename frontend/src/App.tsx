import { useState } from "react";
import "./App.css";
import UploadDialog from "./components/dialog/upload-dialog";
import ProgressDialog from "./components/progress-dialog/progress-dialog";

function App() {
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  return (
    <div className="container">
      <div className="card" onClick={() => setOpen(true)}>
        <div>
          <h1 className="title">Upload a slide deck</h1>
          <p className="subtitle">Turn any PDF or PPT into a narrated video.</p>
        </div>
      </div>
      <div className="instruction-container">
        <a className="instruction" href="/explanation">
          Read the full explanation
        </a>
        <a
          href="https://github.com/pawan-kr1997/file-processing-sse-demo"
          className="instruction"
        >
          View code source
        </a>
      </div>
      <UploadDialog
        open={open}
        setOpen={setOpen}
        setOpenProgress={setOpenProgress}
      />
      <ProgressDialog open={openProgress} setOpen={setOpenProgress} />
    </div>
  );
}

export default App;
