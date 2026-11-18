export interface BoardCell {
  name: string;
  images: string[];
  image?: string;
  activeImageIndex: number;
  showName: boolean;
  showImage: boolean;
  marked: boolean;
}

export interface AniListItem {
  name: string;
  images: string[];
  activeImageIndex: number;
}

export interface MouseButtonsState {
  lmb: boolean;
  rmb: boolean;
}
