import SplitText from "@/TextAnimations/SplitText/SplitText";
function AnimatedCtaText() {
  return (
    <>
      <SplitText
        text="Prompt your way to fast Animations!"
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.5}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        textAlign="center"
      />
    </>
  );
}

export { AnimatedCtaText };
