import React, { useEffect } from "react";
import ProductCard from "./productcard.js";
import { Link } from "react-router-dom";

const ProductViewer = ({ toFindItems, failedToFind }) => {
  useEffect(() => {
    console.log(window.innerWidth);
  }, []);

  if (!toFindItems) {
    return (
      <div className="flex w-32 justify-around relative">
        <span className="p-3 rounded-full absolute left-0 animate-bounce bg-gray-400"></span>
        <span className="p-3 rounded-full absolute  animate-bounce  bg-gray-400"></span>
        <span className="p-3 rounded-full absolute right-0 animate-bounce bg-gray-400"></span>
      </div>
    );
  }
  if (failedToFind) {
    return <div>Sorry that item doesn't exist</div>;
  }

  return (
    <section className="w-full h-page overflow-auto float-right px-4">
      <div className="grid grid-container md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-6 font-type">
        {toFindItems.map((item) => {
          return (
            <div key={item.product_id}>
              <Link to={`/Products/${item.name}`}>
                <ProductCard {...item} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductViewer;
