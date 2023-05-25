import { useState } from "react";
import { FiEye, FiEyeOff, FiMinusCircle, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import axios from "axios";
import { BsPen } from "react-icons/bs";

export default function Product({ product, rate }) {
  const [exist, setExist] = useState(product.exist);
  const [appear, setAppear] = useState(product.appear);
  const [name, setName] = useState(product.name);
  const [nameInp, setNameInp] = useState(false);
  const [description, setDescription] = useState(product.description);
  const [desInp, setDesInp] = useState(false);
  const [usdprice, setPrice] = useState(product.usdprice);
  const [priceInp, setPriceInp] = useState(false);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-center">
        <div>
          {nameInp ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                setNameInp(false);
                axios
                  .put(
                    `/api/${product._id}`,
                    { name, update: "name" },
                    { "content-type": "application/json" }
                  )
                  .then((res) => res.data === "done" && alert("done"));
              }}
              className="text-xl font-bold"
            />
          ) : (
            <div
              className="text-xl font-bold cursor-pointer"
              onClick={() => setNameInp(true)}
            >
              {name}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <div
            className="eye cursor-pointer"
            onClick={() => {
              setAppear(!appear);
              axios
                .put(
                  `/api/${product._id}`,
                  { update: "appear", appear },
                  { "content-type": "application/json" }
                )
                .then((res) => res.data === "done" && alert("done"));
            }}
          >
            {appear ? <FiEye /> : <FiEyeOff className="text-red-500" />}
          </div>
          <div
            className="eye cursor-pointer"
            onClick={() => {
              setExist(!exist);
              axios
                .put(
                  `/api/${product._id}`,
                  { update: "exist", exist },
                  { "content-type": "application/json" }
                )
                .then((res) => res.data === "done" && alert("done"));
            }}
          >
            {exist ? (
              <FiShoppingCart />
            ) : (
              <FiMinusCircle className="text-red-500" />
            )}
          </div>
        </div>
      </div>
      <div>
        {desInp ? (
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => {
              setDesInp(false);
              axios
                .put(
                  `/api/${product._id}`,
                  { description, update: "description" },
                  { "content-type": "application/json" }
                )
                .then((res) => res.data === "done" && alert("done"));
            }}
            className="text-gray-500 text-sm cursor-pointer w-full px-1"
          />
        ) : (
          <div
            className="text-gray-500 text-sm cursor-pointer"
            onClick={() => setDesInp(true)}
          >
            {description ? description : "add description"}
          </div>
        )}
      </div>
      <div
        className="cursor-pointer flex justify-between items-center text-lg"
        onClick={() => setPriceInp(true)}
      >
        <div className={`cursor-pointer flex py-1`}>
          Edit Price: &nbsp;
          {priceInp ? (
            <div
              className={`flex font-bold w-10 gap-1 ${
                priceInp && "bg-mogeColor"
              }`}
            >
              $
              <input
                value={usdprice}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => {
                  setPriceInp(false);
                  axios
                    .put(
                      `/api/${product._id}`,
                      { usdprice, update: "usdprice" },
                      { "content-type": "application/json" }
                    )
                    .then((res) => res.data === "done" && alert("done"));
                }}
                className={`w-10 ${priceInp && "bg-mogeColor"}`}
                onFocus={(e) => (e.target.style.outline = "none")}
              />
              <BsPen />
            </div>
          ) : (
            <div>${usdprice}</div>
          )}
        </div>
        <div>{Math.round((usdprice * rate) / 1000) * 1000} L.L</div>
      </div>
      {product.hasImg && (
        <div className="h-64">
          <Image
            height="260"
            width="260"
            src={`/img/products/${product.image}.png`}
            alt={name}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
