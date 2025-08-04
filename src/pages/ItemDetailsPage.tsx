// src/pages/ItemDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../integrations/supabase/client"; // adjust if path differs

const ItemDetailsPage = () => {
  const { id } = useParams(); // grabs item ID from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from("items") // table name in Supabase
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching item:", error);
      } else {
        setItem(data);
      }
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
      {item.image_url && (
        <img src={item.image_url} alt={item.name} className="w-64 mb-4" />
      )}
      <p className="text-gray-600 mb-2">Price: GH₵{item.price}</p>
      <p className="text-gray-600 mb-2">Stock: {item.quantity}</p>
      <p className="mb-4">{item.description}</p>

      {/* Optional add-to-cart button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetailsPage;
