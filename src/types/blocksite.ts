export type Blocksite = {
  id?: number;
  icon?: string;
  url: string;
  origin_url: string;
  title: string;
  time: {
    start: string;
    end: string;
  };
  days: boolean[];
};
