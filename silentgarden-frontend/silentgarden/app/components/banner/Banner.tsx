import './Banner.css';

export function AppBanner({ title }: { title: string }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
    </div>
  );
}
