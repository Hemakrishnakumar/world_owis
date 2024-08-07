/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    cabin_name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;
  const { createCabin, isCreating } = useCreateCabin();

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Deleted Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  function handleDuplicate() {
    createCabin({
      cabin_name: `copy of ${cabin_name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{cabin_name}</Cabin>
        <div>
          Can accommodate upto <b>{max_capacity}</b> guests
        </div>
        <Price>{formatCurrency(regular_price)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <spn>--</spn>
        )}
        <div style={{ display: "flex", gap: "2px" }}>
          <button onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button disabled={isCreating} onClick={() => setShowForm(!showForm)}>
            <HiPencil />
          </button>
          <button disabled={isDeleting} onClick={() => mutate(cabin.id)}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
