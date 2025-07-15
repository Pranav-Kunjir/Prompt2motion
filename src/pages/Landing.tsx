import { AnimatedBackround } from "@/components/Landing/Animated-Background";
import "@/css/landing.css";
import { AnimatedCtaText } from "@/components/Landing/Animated-cta-text";
import { SignIn } from "@/SignIn";
import { FeatureSection } from "@/components/Landing/FeatureSection";
import ShinyText from "@/TextAnimations/ShinyText/ShinyText";
import { Example } from "@/components/Landing/Example";
export function Landing() {
  return (
    <>
      <div className="cta">
        <AnimatedBackround />
        <div className="overlay">
          <h1>
            <AnimatedCtaText />
          </h1>
          <SignIn />
        </div>
      </div>
      <div className="feature-section">
        <div className="magneto">
          <div className="magneto-txt">
            <h2>
              <ShinyText
                text="Why use Prompt2Motion"
                disabled={false}
                speed={3}
                className="render-btn"
              />
            </h2>
            <p>
              <ShinyText
                text="AI-powered animation from natural language"
                disabled={false}
                speed={3}
                className="render-btn"
              />
            </p>
          </div>
          <FeatureSection />
        </div>
      </div>
      <div className="example-section">
        <h1>
          <ShinyText
            text="Examples"
            disabled={false}
            speed={3}
            className="render-btn"
          />
        </h1>
        <Example />
      </div>
    </>
  );
}
