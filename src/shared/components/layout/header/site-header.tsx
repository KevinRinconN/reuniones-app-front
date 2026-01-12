import { ThemeSwitch } from "../theme-switch";

export function SiteHeader() {
  return (
    <header className="sticky top-0 right-0 z-10 left-0 py-4 bg-background/80 backdrop-blur-lg border-b">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-base font-medium"></h1>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
