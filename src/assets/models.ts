export interface Card {
  title: string,
  body: string,
  color: string,
  editmode: boolean
}

export interface Column {
  title: string,
  cards: Card[],
  editmode: boolean
}

export interface Board {
  img: string,
  title: string,
  members: number,
  visible: boolean,
  fav: boolean,
  date: number
}

export interface MyUser {
  displayName: string,
  photoURL: string,
}
