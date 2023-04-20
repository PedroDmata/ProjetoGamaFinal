import Categoria from './categorias';
import Produtos from './produtos';

Produtos.belongsTo(Categoria, {
  foreignKey: 'id_categoria'
});

Categoria.hasMany(Produtos, {
  foreignKey: 'psicologo_id'
});

export { Categoria, Produtos };
