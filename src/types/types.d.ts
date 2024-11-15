declare module 'next' {
    export interface PageProps {
      params: {
        material: string;
      };
      searchParams?: { [key: string]: string | string[] | undefined };
    }
  }