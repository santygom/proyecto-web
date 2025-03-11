import AbstractCategory from '../category/AbstractCategory'
import AbstractImage from '../image/AbstractImage'

export default abstract class AbstractProduct {
  protected id: string
  protected name: string
  protected price: number
  protected description: string
  protected category: AbstractCategory
  protected stock: number
  protected discount: number
  protected images: AbstractImage[]
  protected inPromotion: boolean

  constructor(productInterface: ProductInterface) {
    this.id = productInterface.id
    this.name = productInterface.name
    this.price = productInterface.price
    this.description = productInterface.description
    this.category = productInterface.category
    this.stock = productInterface.stock
    this.discount = productInterface.discount
    this.images = productInterface.images
    this.inPromotion = productInterface.inPromotion
  }

  public abstract isNull(): boolean

  public getId = (): string => this.id
  public getName = (): string => this.name
  public getPrice = (): number => this.price
  public getDescription = (): string => this.description
  public getCategory = (): AbstractCategory => this.category
  public getStock = (): number => this.stock
  public getDiscount = (): number => this.discount
  public getImages = (): AbstractImage[] => this.images
  public isInPromotion = (): boolean => this.inPromotion

  // Método para calcular el precio con descuento
  public getFinalPrice = (): number => {
    if (this.discount > 0) {
      return this.price * (1 - this.discount / 100)
    }
    return this.price
  }
}

export interface ProductInterface {
  id: string
  name: string
  price: number
  description: string
  category: AbstractCategory
  stock: number
  discount: number
  images: AbstractImage[]
  inPromotion: boolean
}