export default abstract class AbstractImage {
    protected id: string;
    protected url: string;
    protected alt: string;
  
    constructor(imageInterface: ImageInterface) {
      this.id = imageInterface.id;
      this.url = imageInterface.url;
      this.alt = imageInterface.alt;
    }
  
    public abstract isNull(): boolean;
  
    public getId = (): string => this.id;
    public getUrl = (): string => this.url;
    public getAlt = (): string => this.alt;
  }
  
  export interface ImageInterface {
    id: string;
    url: string;
    alt: string;
  }