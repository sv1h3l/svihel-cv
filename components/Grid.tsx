type GridProps = {
    children: React.ReactNode; // Umožní nám přijímat komponenty jako děti
  };
  
  export default function Grid({ children }: GridProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 l gap-12 px-6 py-2">
        {children} 
      </div>
    );
  }
  