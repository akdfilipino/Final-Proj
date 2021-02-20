import React, { useState, useEffect, useRef } from "react";
import ProductViewer from "../productsviewer.js";
import CategoryViewer from "../categoryviewer.js";
import axios from "axios";

const ProductPage = () => {
  const int_state = "All Products";
  const [findthis, setFind] = useState("");
  const [tag, setCateg] = useState(int_state);

  return (
    <section className="w-full h-page overflow-auto p-4">
      <FinderBar setFind={setFind} setCateg={setCateg} int_state={int_state} />
      <section className="grid grid-container pt-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-6 font-type">
        {tag === int_state ? (
          <ProductViewer find={findthis} />
        ) : (
          <CategoryViewer tag={tag} />
        )}
      </section>
    </section>
  );
};
export default ProductPage;

const FinderBar = ({ setFind, setCateg, int_state }) => {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([int_state]);
  const [hidden, setHide] = useState(true);
  const int_btn = useRef();

  useEffect(() => {
    const getTags = async () => {
      const res = await axios.get("http://localhost:9000/products/tags");
      setTags((prev) => prev.concat(res.data));
    };
    getTags();
    int_btn.current.checked = true;
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleTagSel = (e) => {
    const tag = e.target.value;
    if (tag !== "All Products") {
      setHide(false);
    } else {
      setFind("");
      setHide(true);
    }
    setCateg(tag);
  };

  return (
    <>
      <span className="category-bar inline-block overflow-x-scroll w-9/12">
        <span className="w-full h-12 flex">
          {tags.map((tag) => {
            if (tag === int_state) {
              return (
                <label className="radcon">
                  <input
                    ref={int_btn}
                    key={tag}
                    type="radio"
                    name={"Categories"}
                    value={tag}
                    onChange={(e) => {
                      handleTagSel(e);
                    }}
                  />
                  <span className="border min-w-max max-w-lg block cursor-pointer text-center border-darkbrown font-normal font-work text-sm rounded py-2 px-6 mx-2">
                    {tag}
                  </span>
                </label>
              );
            }
            return (
              <label className="radcon">
                <input
                  key={tag}
                  type="radio"
                  name={"Categories"}
                  value={tag}
                  onChange={(e) => {
                    handleTagSel(e);
                  }}
                />
                <span className="border min-w-max block cursor-pointer text-center border-darkbrown font-normal font-work text-sm rounded py-2 px-6 mx-2">
                  {tag}
                </span>
              </label>
            );
          })}
        </span>
      </span>

      {hidden ? (
        <span className="float-right">
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e)}
            className="rounded-full"
          ></input>
          <button
            onClick={() => setFind(query)}
            className="active:outline-none"
          >
            search
          </button>
        </span>
      ) : null}
    </>
  );
};
