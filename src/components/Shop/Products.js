import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    {
        id:'produit 1',
        title:'premier produit',
        price:4,
        description:'premier produit fabuleux'
    },
    {
        id:'produit 2',
        title:'Le deuxieme',
        price:10,
        description:'Un second produit'
    }
]


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
          {DUMMY_PRODUCTS.map(product => <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
          />)}
      </ul>
    </section>
  );
};

export default Products;
