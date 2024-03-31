import toast from "react-hot-toast";
import supabase from "./supabase";

async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (!error) return cabins;
  console.error(error);
  throw new Error("Cabins couldn't be found");
}

async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Error in deleting the cabin");
  }
}

async function addCabin(data) {
  const { res, error } = await supabase.from("cabins").insert([
    {
      cabin_name: data.name,
      regular_price: data.regularPrice,
      max_capacity: data.maxCapacity,
      discount: data.discount,
      description: data.description,
      image: data.image,
    },
  ]);

  if (error) {
    console.error(error.message);
    throw new Error("Error while adding the cabin");
  } else console.log(res);
}

export { getCabins, deleteCabins, addCabin };
