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
  color: string,
  title: string,
  members: number,
  visible: boolean,
  fav: boolean,
  date: number,
  mode: string,
  id: string
}

export interface MyUser {
  displayName: string,
  photoURL: string,
}
