import TextPressure from "./TextPressure";

export default function PressureBand() {
  return (
    <section className="bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-[170px] sm:h-[210px] md:h-[260px]">
          <TextPressure
            text="AUXLOOM"
            flex
            width
            weight
            italic={false}
            alpha={false}
            stroke={false}
            minFontSize={64}
            textColor="#ffffff"
          />
        </div>
      </div>
    </section>
  );
}
