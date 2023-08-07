import { AnyObject } from "yup";

const CheckStockAvailibility = ({ stockAvailability }: any) => {
  const handleFutureStockAvailability = (doesFutureStockExists: any) => {
    if (doesFutureStockExists?.length > 0) {
      return (
        <>
          {doesFutureStockExists?.length > 0 &&
            doesFutureStockExists?.map((stockData: any, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className="text-center border py-3">
                      {stockData?.warehouse}
                    </td>
                    <td className="text-center border">{stockData?.qty}</td>
                    <td className="text-center border">
                      {stockData?.incoming_qty}
                    </td>
                    <td className="text-center border">
                      {stockData?.incoming_date !== ""
                        ? stockData?.incoming_date
                            ?.split("-")
                            .reverse()
                            .join("-")
                        : stockData?.incoming_date === ""}
                    </td>
                    <td className="text-center border">
                      {stockData?.additional_qty}
                    </td>
                    <td className="text-center border">
                      {stockData?.available_on !== ""
                        ? stockData?.available_on
                            ?.split("-")
                            .reverse()
                            .join("-")
                        : stockData?.available_on === ""}
                    </td>
                  </tr>
                </>
              );
            })}
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div id="scroll_btn">
      <div className="stock_availibility_table">
        <table className="table table-hover stock table-bordered">
          <thead>
            <tr className="stock_availa_header">
              <th className="text-center stock_availa_header">
                Warehouse name
              </th>
              <th className="text-center">Available Stock Qty</th>
              <th className="text-center">Incoming Stock Qty</th>
              <th className="text-center">Estimated Incoming Stock Date</th>
              <th className="text-center">Additional Qty</th>
              <th className="text-center">Available On</th>
            </tr>
          </thead>

          {handleFutureStockAvailability(stockAvailability?.stockAvailability)}
        </table>
      </div>
    </div>
  );
};

export default CheckStockAvailibility;
