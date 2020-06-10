interface cardData{
  name: string;
  image: string;
  description: string;
  dateLastEdited: string
}

interface params{
  sortBy?: number;
  searchBy?: string;
}
interface appProps{
  mockData: cardData[];
  match?: match<params>;
  history?: any;
}



interface page{
  pageNo: number;
  selected: boolean;
}