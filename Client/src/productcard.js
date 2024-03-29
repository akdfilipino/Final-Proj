import React, { useEffect, useState } from "react";

const ProductCard = (props) => {
  const { productId, productImage, type, productName, options } = props;
  let optionsrange = "";
  if (options.length === 1) {
    optionsrange = `\u20b1${options[0].price}`;
  } else {
    const arr = options.map((op) => op.price);
    const high = Math.max(...arr);
    const low = Math.min(...arr);
    if (low === high) {
      optionsrange = `\u20b1${high}`;
    } else optionsrange = `\u20b1${low} - \u20b1${high}`;
  }
  const [img, setImg] = useState(0);
  const [slide, setSlide] = useState(null);

  const checkTitleLength = (productName) => {
    if (productName.length > 45) {
      return productName.slice(0, 45) + "...";
    } else return productName;
  };

  const handleHover = () => {
    setSlide(
      setInterval(() => {
        setImg((prev) => (prev < productImage.length - 1 ? prev + 1 : 0));
      }, 850)
    );
  };

  const handleLeave = () => {
    clearInterval(slide);
    setImg(0);
  };

  useEffect(() => {
    return () => {
      setSlide(null);
      setImg(0);
    };
  }, []);

  return (
    <article
      onMouseEnter={() => {
        handleHover();
      }}
      onMouseLeave={() => {
        handleLeave();
      }}
      className="product-box cursor-pointer rounded group shadow-clean transform hover:-translate-y-1  hover:shadow-light w-full relative bg-white"
    >
      <div className="overflow-hidden h-64 rounded-t-sm">
        <img
          src={`https://testcofmon.herokuapp.com/api/products/image/${productImage[img]}`}
          alt={productId}
          className="min-h-full"
        />
      </div>
      <div className="pl-3 pr-3 py-1 md:py-2 max-h-32">
        <h3 className="sm:text-norm text-sm">
          {checkTitleLength(productName)}
        </h3>
        <p className=" text-xs md:text-sm text-coffee">{type}</p>
        <p className="text-coffee left-3 mb-12 text-xs sm:text-lg float-right">
          {optionsrange}
        </p>
      </div>

      <div className="w-full flex justify-center">
        <button className="w-11/12 m-auto absolute bottom-2 py-1 sm:py-2 text-coffee bg-white border-coffee text-xs border btn-focus group-hover:py-1 sm:group-hover:py-1.5 group-hover:text-white sm:group-hover:text-sm group-hover:text-xs group-hover:bg-espresso group-hover:border-espresso group-hover:w-full group-hover:rounded-none">
          View Details
        </button>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
