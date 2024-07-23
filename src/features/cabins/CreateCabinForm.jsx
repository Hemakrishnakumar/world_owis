import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  console.log(cabinToEdit);
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: onClose(),
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
  }

  function onError(err) {
    console.log(err);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <h3>Add a new Cabin</h3>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="name" error={errors?.name?.message}>
          <Input
            type="text"
            id="cabin_name"
            {...register("cabin_name", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="max_capacity"
            {...register("max_capacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be atleast 1",
              },
            })}
          />
        </FormRow>
        <FormRow label="Regular price" error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="regular_price"
            {...register("regular_price", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            {...register("discount", {
              required: "This field is required",
              // validate: (value) =>
              //   value < getValues().regularPrice ||
              //   "Discount should be less than the regular price",
            })}
            defaultValue={0}
          />
        </FormRow>
        <FormRow label="Description">
          <Textarea
            type="number"
            id="description"
            {...register("description")}
            defaultValue=""
          />
        </FormRow>

        <FormRow label="Cabin Photo">
          <FileInput
            id="image"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
            accept="image/*"
            type="file"
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isEditSession ? "Update cabin" : "Add cabin"}
          </Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default CreateCabinForm;
