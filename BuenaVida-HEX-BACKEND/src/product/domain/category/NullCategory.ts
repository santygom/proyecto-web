import AbstractCategory, { CategoryInterface } from './AbstractCategory';

export default class NullCategory extends AbstractCategory {
  constructor() {
    super({
      id: '',
      name: 'Category not found',
      description: ''
    });
  }

  public override isNull = (): boolean => true;
}