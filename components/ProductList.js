import EditableProduct from "./EditableProduct";
import Product from "./Product";

const ProductList = ({
  products,
  rate,
  selectedItems,
  addToSelectedItems,
  admin,
}) => {
  const filteredProducts = products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-3">
      {filteredProducts?.map((product, j) => {
        const selectedProduct = admin
          ? []
          : selectedItems.find((item) => item.product === product);
        const selectedQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <div
            key={j}
            className={`bg-white p-4 rounded shadow-md shadow-mogeColor`}
          >
            {!admin ? (
              <Product
                product={product}
                rate={rate}
                selectedQuantity={selectedQuantity}
                addToSelectedItems={addToSelectedItems}
                admin={admin}
              />
            ) : (
              <EditableProduct
                product={product}
                rate={rate}
                selectedQuantity={selectedQuantity}
                addToSelectedItems={addToSelectedItems}
                admin={admin}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
