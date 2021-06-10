import Main from "../../components/main";
import CustomTable from "../../components/table";
import AddReservationForm from "../../components/window";
import { Button } from "@material-ui/core";
import { useState } from "react";

export default function pageName() {
  const [isAddReservationsOpen, setAddReservationStatus] =
    useState<boolean>(false);

  return (
    <>
      <Main>
        <section className="reservation">
          {isAddReservationsOpen && (
            <AddReservationForm
              cancel={() => {
                setAddReservationStatus(false);
              }}
            />
          )}
          <div className="table_holder">
            <CustomTable />
            <Button
              className="btn"
              onClick={() => {
                setAddReservationStatus(true);
              }}
            >
              Add New
            </Button>
          </div>
        </section>
      </Main>
    </>
  );
}
