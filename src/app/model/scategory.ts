import { Category, CategoryDto } from './category';

export class Scategory {
  id: number;
  code: string;
  libelle: string;

  categorie: Category;

}

export class ScategoryDto {

  id: number;
  code: string;
  libelle: string;

  categoryDto: CategoryDto;

}
