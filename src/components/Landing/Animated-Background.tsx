import Particles from "@/backgrounds/Particles/Particles";
import "@/css/animatedbackround.css";
export function AnimatedBackround() {
  return (
    <div className="animated-background">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
}
