import Button from "./Button"; // Import tlačítka

type ColumnProps = {
  label: string;
  buttons: {
    iconSrc: string;
    label: string;
    url: string;
    triggerKey?: string;
  }[]; // Pole tlačítek
};

export default function Column({ label, buttons }: ColumnProps) {
  return (
    <div className="flex flex-col space-y-3 p-4">
      {" "}
      {/* flex-col zajistí zobrazení tlačítek pod sebou */}
      <span className="font-bold text-2xl">{label}</span>
      {buttons.map((button, index) => (
        <Button
          key={index}
          iconSrc={button.iconSrc}
          label={button.label}
          url={button.url}
          triggerKey={button.triggerKey}
        />
      ))}
    </div>
  );
}
