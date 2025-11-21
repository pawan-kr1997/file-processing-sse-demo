"use client";
import { Box } from "@chakra-ui/react";
import umlImage from "../../assets/uml.png";
import styles from "./Explanation.module.css";

const Explanation = () => {
  return (
    <Box colorPalette="light" minH="100vh" bg="white" color="black">
      <div className={styles.container}>
        <h3 className={styles.header}>Background & Problem Context</h3>
        <p className={styles.mt}>
          Click on <span className={styles.inlineCode}>Create</span> and
          suddenly that spinning loader leaves me wondering: Do I have enough
          time to make my bed? Take a quick shower? Grab a coffee from around
          the corner while the file is still processing? That uncertainty comes
          from not really knowing what is happening behind the scenes or where I
          stand in the overall progress.
        </p>
        <p className={styles.mt}>
          I saw an opportunity to introduce a clearer way for users to
          understand what is happening, something that offers meaningful
          progress updates during file processing, shows how far along the
          workflow is, and highlights which step is currently running.
        </p>
        <p className={styles.mt}>
          Working through this challenge gave me a reason to put design patterns
          into practice and made me more confident in the clean-code direction I
          am aiming for.
        </p>
        <h3 className={`${styles.mt2} ${styles.header}`}>
          Implementation Approach
        </h3>
        <p className={styles.mt}>
          The backend is built using Node.js, with React powering the frontend.
          To simulate real file processing behavior, each stage in the pipeline
          is represented using <b>Promises</b> combined with{" "}
          <span className={styles.inlineCode}>setTimeout</span> to mimic
          time-consuming operations.
        </p>
        <p className={styles.mt}>
          I am assuming that the actual file processing logic, consisting of
          several sequential steps is already implemented, fully battle-tested,
          and should not be modified to avoid introducing unexpected issues. The
          simulation focuses solely on replicating the user experience,
          mimicking the UI flow and processing steps of the real platform as
          closely as possible while adding progress tracking capability.{" "}
        </p>
        <p className={styles.mt}>
          To push progress updates to the client efficiently, I am using{" "}
          <b>Server-Sent Events (SSE)</b> instead of polling or WebSockets.
          Polling would generate frequent, unnecessary HTTP requests, and
          WebSockets would introduce additional connection overhead for a
          scenario that only requires one-way communication.
        </p>
        <h3 className={`${styles.mt2} ${styles.header}`}>Design Decision</h3>

        <p className={styles.mt}>
          This application simulates a complete file-processing pipeline using
          the <b>Middleware Chain Pattern</b>, combined with the{" "}
          <b>Factory Method</b> and <b>Decorator design patterns</b> to keep the
          system modular, extensible, and maintainable.
        </p>
        <img className={styles.image} src={umlImage} alt="uml diagram" />
        <p className={styles.mt}>
          The file workflow is divided into six clearly defined stages:{" "}
          <b>
            upload, validation, conversion, content extraction, semantic
            processing,
          </b>{" "}
          and <b>speech script generation</b>. The Middleware Chain Pattern was
          chosen because it allows each stage to be implemented as an isolated
          middleware unit. This provides strong separation of concerns, makes
          the request flow feel natural, and keeps the processing pipeline easy
          to reason about and extend.
        </p>
        <p className={styles.mt}>
          Each middleware focuses on a single responsibility, while the shared{" "}
          <span className={styles.inlineCode}>FileContext</span> travels through
          the chain and is updated step by step. Since the platform must support
          multiple file formats such as PDF, PPT, PPTX etc, a{" "}
          <span className={styles.inlineCode}>FileHandler</span> interface
          defines a common contract for all file types. The{" "}
          <b>Factory Method Pattern</b> is used to instantiate the appropriate
          concrete file handler based on the file’s format. This approach
          ensures that format-specific logic is encapsulated within its
          respective handler, enabling clean extensibility without requiring
          changes to the pipeline or its consumers.
        </p>
        <p className={styles.mt}>
          To introduce progress-tracking functionality without modifying the
          existing, production-tested file-processing logic, a{" "}
          <span className={styles.inlineCode}>ProgressDecorator</span> was
          added. Instead of altering the core handlers—which risks unintended
          side effects—the decorator wraps any handler and intercepts method
          calls to add progress reporting using <b>server sent events</b> while
          delegating all actual work to the underlying implementation. This
          adheres to the Open/Closed Principle and allows new behavior to be
          introduced safely and transparently.
        </p>
        <h3 className={`${styles.mt2} ${styles.header}`}>
          Scalability Considerations
        </h3>
        <p className={styles.mt}>
          To scale the progress tracking capability beyond a single server
          instance, the architecture can be extended using <b>Redis Pub/Sub</b>{" "}
          along with dedicated <b>worker</b> processes. Each worker would handle
          a portion of the file processing workload and publish progress updates
          to Redis as different stages are completed. The main Node.js server,
          regardless of how many instances are running behind a load balancer,
          can subscribe to these Redis channels and push real-time progress
          updates to clients via SSE. This design decouples processing from
          delivery and enables horizontal scaling.
        </p>
      </div>
    </Box>
  );
};

export default Explanation;
