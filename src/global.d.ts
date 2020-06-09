interface cardData{
  name: string;
  image: string;
  description: string;
  dateLastEdited: string
}

interface appProps{
  mockData: cardData[];
}



interface page{
  pageNo: number;
  selected: boolean;
}