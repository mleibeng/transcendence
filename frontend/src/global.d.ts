interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Define your environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }