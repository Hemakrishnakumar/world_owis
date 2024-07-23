import supabase, { supabaseUrl } from "./supabase";

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

async function addEditCabin(data, id) {
  const hasImage = data.image?.startsWith?.("https");
  //https://sspwobeyiopdidfdwvqj.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  const imageName = `${Math.random()}-${data.image.name}`.replaceAll("/", "");
  const imagePath = hasImage
    ? data.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  //create or edit the cabin
  let query = supabase.from("cabins");

  //A) create
  if (!id) query = query.insert([{ ...data, image: imagePath }]);
  if (id) query = query.update({ ...data, image: imagePath }).eq("id", id);
  const { data: res, error } = await query.select().single();
  if (error) {
    console.error(error.message);
    throw new Error("Error while adding the cabin");
  } else {
    console.log();
    //uploading the image
    if (hasImage) return;
    const { data: uploadRes, err: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, data.image);
    if (storageError) {
      // delete the cabin if there is any error in uploading the image
      await deleteCabins(res.id);
      throw new Error("Error while uploading the image");
    } else console.log(uploadRes);
  }

  //upload image
}

export { getCabins, deleteCabins, addEditCabin };
