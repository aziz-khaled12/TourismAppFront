import React from "react";

const RestaurantOrders = ({ restaurant }) => {

  
  return (
    <>
      <div className="mb-6 w-full flex justify-between items-center ">
        <div className="font-[500] text-xl w-fit">Orders</div>
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<FaPlus className="!text-sm" />}
          className="!bg-primary !font-[600] !text-md"
        >
          {" "}
          Add new Order
        </Button>
      </div>
      <Box
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <DataGrid
          sx={{
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar": {
              width: "6px",
            },
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb": {
              backgroundColor: "#c4c4c4",
              borderRadius: "10px",
              border: "2px solid transparent",
            },
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb:hover": {
              background: "#a1a1a1",
            },
          }}
          rows={menuItems}
          columns={columns}
          pageSize={5}
          disableColumnMenu
          rowHeight={70}
        />
      </Box>
    </>
  );
};

export default RestaurantOrders;
