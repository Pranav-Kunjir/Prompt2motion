// import MagicBento from "@/TextAnimations/MagicBento/MagicBento";
import CardSwap, { Card } from "@/TextAnimations/CardSwap/CardSwap";
import "@/css/featuresection.css";
import export_vid from "@/assets/videos/export-video.mp4";
import sine_vid from "@/assets/videos/sin-wave.mp4";
export function FeatureSection() {
  return (
    <div style={{ height: "600px", position: "relative" }}>
      <CardSwap
        cardDistance={80}
        verticalDistance={80}
        delay={5000}
        pauseOnHover={false}
      >
        <Card>
          <h3>⚡ Instant Animation</h3>
          <p>
            Turn simple text prompts into animations — powered by Manim + GPT.
          </p>
        </Card>

        <Card>
          <h3>💬 Chat Interface</h3>
          <p>
            Interact with your AI assistant to refine ideas and prompts on the
            go.
          </p>
        </Card>

        <Card>
          <h3>🎞️ Real-Time Previews</h3>
          <p>
            Watch your animations render live — no need to install anything.
          </p>
        </Card>

        <Card>
          <h3>📦 Export Everything</h3>
          <video
            className="card-video"
            src={export_vid}
            autoPlay
            loop
            muted
            playsInline
          />
        </Card>

        <Card>
          <h3>🎓 For Students & Educators</h3>
          <video
            className="card-video"
            src={sine_vid}
            autoPlay
            loop
            muted
            playsInline
          />
        </Card>

        <Card>
          <h3>🌐 Cloud-Powered</h3>
          <p>
            No environment setup, all rendering handled in the cloud securely.
          </p>
        </Card>
      </CardSwap>
    </div>
  );
}
