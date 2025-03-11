import AbstractImage, { ImageInterface } from './AbstractImage';

export default class NullImage extends AbstractImage {
  constructor() {
    super({
      id: '',
      url: '',
      alt: 'Image not found'
    });
  }

  public override isNull = (): boolean => true;
}