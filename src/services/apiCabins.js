import supabase from "./supabase";

async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (!error) return cabins;
  console.error(error);
  throw new Error("Cabins couldn't be found");
}

export default getCabins;
