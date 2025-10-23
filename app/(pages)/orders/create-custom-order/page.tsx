"use client";
import { fetchServerSideData } from "@/action/fetchServerSideData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateCustomOrderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [orderPayloadData, setOrderPayloadData] = useState<any>({
    isCustomOrder: true,
    paymentMethod: "partial-payment",
    shippingMethod: "inside-dhaka",
    subTotal: 0,
    vatIncluded: 0,
    shippingCharge: 0,
    totalAmount: 0,
    discountAmount: 0,
    totalPay: 0,
    due: 0,
    paymentStatus: "pending",
    deliveryStatus: "pending",
    shippingAddress: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      street: "",
      postalCode: "",
      details: "",
    },
    remark: "",
    product: [],
  });

  const router = useRouter();

  const handleSearch = async () => {
    setProduct(null);
    setQuantity(0);
    setColor("");
    setSize("");

    if (!searchQuery.trim()) {
      toast.error("Please enter a product ID or SKU.");
      return;
    }

    try {
      // Build query parameters
      const params = searchQuery.match(/^[0-9a-fA-F]{24}$/)
        ? `_id=${searchQuery}`
        : `sku=${searchQuery}`;

      const url = `${process.env.API_URL}/api/v1/product/search?${params}`;
      const response = await fetchServerSideData(url);

      if (!response) {
        toast.error("Error fetching product.");
        return;
      }

      console.log("response", response);
      setProduct(response);
    } catch (err: any) {
      toast.error(err?.message || "Error fetching product.");
    }
  };

  const addProductIntoPayload = () => {
    if (!color) {
      toast.error("Please choose a color");
      return;
    }
    if (!size) {
      toast.error("Please choose a size");
      return;
    }
    if (quantity === 0) {
      toast.error("Please add quantity");
      return;
    }

    // Extract selected product details
    const selectedProduct = {
      productDetails: product._id,
      title: product.productName,
      salePrice: product.salePrice || 0,
      offeredPrice: product.salePrice || 0, // Assuming offeredPrice comes from regularPrice
      sku: product.sku,
      slug: product.slug,
      imgUrl:
        product.variant.find((v: any) => v.color === color)?.imageUrl[0]
          ?.image || product.variant[0].imageUrl[0].image,
      quantity: quantity,
      color: color,
      size: size,
      stock: product.stock || 0,
      preOrder: product.preOrder || false,
      sizeChart: null,
    };

    // Update order payload data with the new product
    setOrderPayloadData((prevState: any) => ({
      ...prevState,
      subTotal: prevState.subTotal + selectedProduct.salePrice * quantity,
      totalAmount:
        prevState.totalAmount +
        selectedProduct.salePrice * quantity -
        prevState.discountAmount,
      product: [...prevState.product, selectedProduct],
    }));

    // Reset input fields
    setColor("");
    setSize("");
    setQuantity(0);

    toast.success("Product added to the order stage");
  };

  const VAT_RATE = 0.07; // 7% VAT

  useEffect(() => {
    setOrderPayloadData((prevState: any) => ({
      ...prevState,
      vatIncluded: parseFloat((prevState.totalAmount * VAT_RATE).toFixed(2)), // Calculate and round VAT
    }));
  }, [orderPayloadData.totalAmount]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = Number(e.target.value);
    let newTotalAmount = 0;
    setOrderPayloadData((prevState: any) => {
      newTotalAmount = prevState.subTotal - discount + prevState.shippingCharge;

      return {
        ...prevState,
        discountAmount: discount,
        totalAmount: newTotalAmount > 0 ? newTotalAmount : 0, // Ensure totalAmount doesn't go negative
      };
    });
    if (orderPayloadData.totalPay) {
      setOrderPayloadData((prevState: any) => {
        return {
          ...prevState,
          due: newTotalAmount - prevState.totalPay,
        };
      });
    }
  };

  const handleShippingChargeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const shippingCharge = Number(e.target.value);
    let newTotalAmount = 0;
    setOrderPayloadData((prevState: any) => {
      newTotalAmount =
        prevState.subTotal + shippingCharge - prevState.discountAmount;

      return {
        ...prevState,
        shippingCharge: shippingCharge,
        totalAmount: newTotalAmount > 0 ? newTotalAmount : 0, // Ensure totalAmount doesn't go negative
      };
    });
    if (orderPayloadData.totalPay) {
      setOrderPayloadData((prevState: any) => {
        return {
          ...prevState,
          due: newTotalAmount - prevState.totalPay,
        };
      });
    }
  };

  const handleTotalPay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const totalPay = Number(e.target.value);

    setOrderPayloadData((prevState: any) => {
      const totalDue =
        prevState.subTotal +
        prevState.shippingCharge -
        prevState.discountAmount -
        totalPay;

      return {
        ...prevState,
        due: totalDue,
        totalPay: totalPay, // Ensure totalAmount doesn't go negative
      };
    });
  };

  const handleOrderCreate = async () => {
    if (
      !orderPayloadData.shippingAddress.fullName ||
      !orderPayloadData.shippingAddress.phone ||
      !orderPayloadData.shippingAddress.city ||
      !orderPayloadData.shippingAddress.country ||
      !orderPayloadData.shippingAddress.email
    ) {
      toast.error("Please fill up required shipping address");
      return;
    }

    if (
      !orderPayloadData.deliveryStatus ||
      !orderPayloadData.paymentMethod ||
      !orderPayloadData.paymentStatus ||
      !orderPayloadData.shippingMethod ||
      orderPayloadData.subTotal === 0 ||
      orderPayloadData.totalAmount === 0 ||
      orderPayloadData.totalPay === 0
    ) {
      toast.error("Please fill up required order details");
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/api/v1/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
        },
        body: JSON.stringify(orderPayloadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      router.push("/orders");
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    }
  };

  return (
    <div className="dynamic-container bg-white">
      <p className="text-xl font-bold">Custom Order</p>
      <div className="my-3">
        <p className="font-bold ">Search Product:</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-72"
            placeholder="Enter Product ID or SKU"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-secondary text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
      {product && (
        <div className="mb-5">
          <div className="">
            <div className="flex gap-4 items-center justify-between border p-4 rounded-md">
              <div className="flex gap-3 items-center">
                <Image
                  src={product.variant[0].imageUrl[0].image}
                  alt={"product image"}
                  width={80}
                  height={60}
                  className="rounded-md"
                />
                <Link
                  href={`/products/update-product/${product._id}`}
                  className="text-gray-600 flex flex-col gap-0.5"
                >
                  <p className="text-base font-semibold">
                    {product.productName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Sku:</span> {product.sku}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Sale Price:</span>
                    <span className="font-medium"> ৳{product.salePrice}</span>
                  </p>
                </Link>
              </div>
              <div className="text-gray-600 flex flex-col gap-2">
                <div className="text-sm flex items-center gap-1 mb-1">
                  <span className="font-medium">Color:</span>{" "}
                  <p className="flex items-center gap-1">
                    {product.variant.map((item: any, index: number) => (
                      <button
                        onClick={() => setColor(item.color)}
                        key={index}
                        className={`border px-2 rounded ${
                          color == item.color
                            ? "bg-secondary text-white border-secondary"
                            : "bg-transparent border-gray-400"
                        }`}
                      >
                        {item.color}
                      </button>
                    ))}
                  </p>
                </div>
                <div className="text-sm flex items-center gap-2">
                  <p className="font-medium">Size:</p>{" "}
                  <p className="flex items-center gap-1">
                    {product.size.map((item: any, index: number) => (
                      <button
                        onClick={() => setSize(item)}
                        className={`border px-2 rounded ${
                          size == item
                            ? "bg-secondary text-white border-secondary"
                            : "bg-transparent border-gray-400"
                        }`}
                        key={index}
                      >
                        {item}
                      </button>
                    ))}
                  </p>
                </div>
                {/* <p className="text-sm">
                      <span className="font-medium">Quantity:</span>{" "}
                      {el.quantity}
                    </p> */}
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Quantity</p>
                <input
                  type="number"
                  className="border border-gray-400 px-2 py-1 rounded-md w-20"
                  placeholder="Enter Quanitity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <button
                onClick={addProductIntoPayload}
                className="bg-secondary text-white px-4 py-1.5 rounded-md"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="border p-3 flex gap-6">
        <div className="">
          <h3 className="font-bold mb-2 text-lg text-gray-700">
            Shipping Address:
          </h3>

          <div className="border p-4 rounded">
            <div className="flex items-center">
              <label className="w-56 font-medium text-gray-500" htmlFor="name">
                Name
                <span style={{ color: "red" }} className="font-bold">
                  *
                </span>{" "}
                :
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                type="text"
                id="name"
                required
                placeholder="Enter Name"
                value={orderPayloadData.shippingAddress.fullName}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      fullName: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label className="w-56 font-medium text-gray-500" htmlFor="name">
                Email
                <span style={{ color: "red" }} className="font-bold">
                  *
                </span>{" "}
                :
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                type="email"
                id="email"
                required
                placeholder="Enter email"
                value={orderPayloadData.shippingAddress.email}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      email: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label className="w-56 font-medium text-gray-500" htmlFor="phone">
                Phone
                <span style={{ color: "red" }} className="font-bold">
                  *
                </span>{" "}
                :
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="phone"
                type="number"
                placeholder="Enter Phone"
                required
                value={orderPayloadData.shippingAddress.phone}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      phone: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label
                className="w-56 font-medium text-gray-500"
                htmlFor="street"
              >
                Street:
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="street"
                type="text"
                placeholder="Input Here"
                required
                value={orderPayloadData.shippingAddress.street}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      street: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label className="w-56 font-medium text-gray-500" htmlFor="city">
                City
                <span style={{ color: "red" }} className="font-bold">
                  *
                </span>{" "}
                :
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                type="text"
                id="city"
                placeholder="Enter City"
                required
                value={orderPayloadData.shippingAddress.city}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label
                className="w-56 font-medium text-gray-500"
                htmlFor="country"
              >
                Country
                <span style={{ color: "red" }} className="font-bold">
                  *
                </span>{" "}
                :
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                type="text"
                id="country"
                required
                placeholder="Enter Country"
                value={orderPayloadData.shippingAddress.country}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label
                className="w-56 font-medium text-gray-500"
                htmlFor="postalCode"
              >
                Postal Code:
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="postalCode"
                type="text"
                placeholder="Enter Postal Code"
                value={orderPayloadData.shippingAddress.postalCode}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      postalCode: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label
                className="w-56 font-medium text-gray-500"
                htmlFor="details"
              >
                Details:
              </label>
              <input
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                type="text"
                id="details"
                placeholder="Enter Any Info"
                value={orderPayloadData.shippingAddress.details}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    shippingAddress: {
                      ...orderPayloadData.shippingAddress,
                      details: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center">
              <label
                className="w-56 font-medium text-gray-500"
                htmlFor="remark"
              >
                Remark:
              </label>

              <textarea
                name="note"
                className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1 box-border outline-none"
                id="remark"
                placeholder="Enter Remarks"
                value={orderPayloadData.remark}
                onChange={(e) =>
                  setOrderPayloadData({
                    ...orderPayloadData,
                    remark: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-lg text-gray-700">
            Order Details:
          </h3>
          <div className="flex  gap-5 border p-4 rounded">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label
                  className="w-56 font-medium text-gray-500"
                  htmlFor="name"
                >
                  Shipping Method
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <select
                  className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                  required
                  value={orderPayloadData.shippingMethod}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      shippingMethod: e.target.value,
                    })
                  }
                >
                  <option value="inside-dhaka">Inside Dhaka</option>
                  <option value="outside-dhaka">Outside Dhaka</option>
                  <option value="shop-pickup">Shop Pickup</option>
                </select>
              </div>

              <div className="flex items-center">
                <label
                  className="w-56 font-medium text-gray-500"
                  htmlFor="name"
                >
                  Payment Method
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <select
                  className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                  required
                  value={orderPayloadData.paymentMethod}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      paymentMethod: e.target.value,
                    })
                  }
                >
                  <option value="partial-payment">Partial Payment</option>
                  <option value="full-payment">Full Payment</option>
                </select>
              </div>

              <div className="flex items-center">
                <label
                  className="w-56 font-medium text-gray-500"
                  htmlFor="name"
                >
                  Payment Status
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <select
                  className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                  required
                  value={orderPayloadData.paymentStatus}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      paymentStatus: e.target.value,
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="partial request">Partial Request</option>
                  <option value="full request">Full Request</option>
                  <option value="partial successful">Partial Successful</option>
                  <option value="full successful">Full Successful</option>
                </select>
              </div>
              <div className="flex items-center">
                <label
                  className="w-56 font-medium text-gray-500"
                  htmlFor="name"
                >
                  Delivery Status
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <select
                  className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                  required
                  value={orderPayloadData.deliveryStatus}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      deliveryStatus: e.target.value,
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="order received">Order Received</option>
                  <option value="on process">On Process</option>
                  <option value="ready to deliver">Ready To Deliver</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="flex items-center">
                <label
                  className="w-56 font-medium text-gray-500"
                  htmlFor="phone"
                >
                  Shipping Charge:
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  placeholder="Enter Shipping Charge"
                  required
                  value={orderPayloadData.shippingCharge}
                  onChange={handleShippingChargeChange}
                  // onBlur={updateShippingCharge}
                />
              </div>
              <div className="flex items-center">
                <label className="w-56 font-medium text-gray-500">
                  Sub Total
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  placeholder="Enter Sub Total"
                  required
                  value={orderPayloadData.subTotal}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      subTotal: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label className="w-56 font-medium text-gray-500">
                  Vat Included:
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  placeholder="Enter Vat"
                  required
                  value={orderPayloadData.vatIncluded}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      vatIncluded: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center">
                <label className="w-56 font-medium text-gray-500">
                  Discount Amount:
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  required
                  placeholder="Enter Discount Amount"
                  value={orderPayloadData.discountAmount}
                  onChange={handleDiscountChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-56 font-medium text-gray-500">
                  Total Amount
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  placeholder="Enter Total Amount"
                  value={orderPayloadData.totalAmount}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      totalAmount: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center">
                <label className="w-56 font-medium text-gray-500">
                  Total Pay
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  placeholder="Enter Total Pay"
                  value={orderPayloadData.totalPay}
                  onChange={(e) => handleTotalPay(e)}
                />
              </div>
              <div className="flex items-center">
                <label className="w-56 font-medium text-gray-500">
                  Due
                  <span style={{ color: "red" }} className="font-bold">
                    *
                  </span>{" "}
                  :
                </label>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                  type="number"
                  placeholder="Enter Due"
                  value={orderPayloadData.due}
                  onChange={(e) =>
                    setOrderPayloadData({
                      ...orderPayloadData,
                      due: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderPayloadData.product.length > 0 && (
        <div className="">
          <h3 className="font-semibold mb-2 text-xl mt-3">
            Selected Products:
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {(orderPayloadData as any).product.map((el: any, i: number) => (
              <div
                className="flex items-center mb-3 justify-between border p-4 rounded-md"
                key={i}
              >
                <div className="flex gap-3 items-center">
                  <Image
                    src={el.imgUrl}
                    alt={el.slug}
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="text-gray-600 flex flex-col gap-1">
                    <p className="text-base font-semibold">{el.title}</p>
                    <p className="text-sm">
                      <span className="font-medium">Sku:</span> {el.sku}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Sale Price:</span> ৳
                      {el.salePrice}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 flex flex-col gap-1">
                  <p className="text-sm">
                    <span className="font-medium">Color:</span> {el.color}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Size:</span> {el.size}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Quantity:</span> {el.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {orderPayloadData.product.length > 0 && (
        <div className="pb-4">
          <button
            onClick={handleOrderCreate}
            className="bg-secondary text-white px-4 py-1.5 rounded-md"
          >
            Create Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateCustomOrderPage;
