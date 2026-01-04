export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div className="animate-fade-up opacity-0">
        <h1 className="text-2xl font-display font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">This page is under construction</p>
      </div>
      <div className="card-elevated p-12 text-center animate-fade-up opacity-0 stagger-1">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🚧</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          This section is being developed. Check back soon for full functionality.
        </p>
      </div>
    </div>
  );
}
