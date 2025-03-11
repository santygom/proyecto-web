import AbstractCategory, { CategoryInterface } from './AbstractCategory';

export default class Category extends AbstractCategory {
  constructor(categoryInterface: CategoryInterface) {
    super(categoryInterface);
  }

  public isNull = (): boolean => false;
}