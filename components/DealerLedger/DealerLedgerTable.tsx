import React, { useState, useEffect } from "react";
import { dealerLedgerStore } from "../../store/slices/dealer-ledger-slice/dealer-ledger-slice";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../services/config/app-config";
import GetSalesVoucherPdf from "../../store/slices/dealer-ledger-slice/sales-voucher-pdf";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const DealerLedgerTable = ({ dealerLedgerSummary }: any) => {
  const dealerledger: any = useSelector(dealerLedgerStore);
  console.log("dealerledgerData in table", dealerledger);
  let [exportAsGenerateURL, setExportAsGenerateURL] = useState("");
  const TokenFromStore: any = useSelector(get_access_token);

  useEffect(() => {
    if (dealerledger?.data?.range?.includes("To")) {
      const ledgerDates = dealerledger?.data?.range.split("To");
      setExportAsGenerateURL(
        `party=${dealerLedgerSummary?.party_name}&from_date=${ledgerDates[0]}&to_date=${ledgerDates[1]}`
      );
    } else {
      setExportAsGenerateURL(
        `party=${dealerLedgerSummary?.party_name}&month=${dealerledger?.data?.range}`
      );
    }
  }, [dealerledger]);

  const handleExport = () => {
    console.log("handleexport", exportAsGenerateURL);
    const version = CONSTANTS.VERSION;
    const method = "export_ledger";
    const entity = "gl";

    window.location.href = `
        ${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&${exportAsGenerateURL}
        `;
  };

  const HandleLedgerPdf = async (pdf_link: any) => {
    let voucherPdfRes = await GetSalesVoucherPdf(
      pdf_link,
      TokenFromStore?.token
    );
    window.open(`${voucherPdfRes}`, "_blank");
  };
  return (
    <>
      {/* {dealerledger?.data?.sales_data?.length > 0 ? (
        <> */}
      <div className="table-responsive dealer-ledger-table">
        <table className="table table-bordered ">
          <thead className="">
            <tr className="table-info">
              <div className="d-flex py-3">
                <>
                  <h5 className="bold black mb-0 flex-fill fs-2 dealer-ledger-td-l">
                    Ledger
                  </h5>
                  <div>
                    <a
                      target="_blank"
                      className="black mr-4 text-underline dealer-ledger-td-r"
                      style={{ cursor: "pointer" }}
                      onClick={handleExport}
                    >
                      Export as
                      <i
                        className="fa fa-file-excel-o ps-2"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </>
              </div>
            </tr>
          </thead>
          <tbody className="border">
            <div className="card-body mt-1">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="mb-0 bold dealer-ledger-td-l">
                    {dealerledger?.data?.party_name}
                  </h3>
                </div>
                <div className="text-sm-right mt-3 mt-sm-0 text-end col-sm-6">
                  <h4 className="bold mb-0 dealer-ledger-td-r">
                    {dealerledger?.data?.range}
                  </h4>
                  <p className="bold mb-0"></p>
                </div>
              </div>
            </div>
            <hr />
            <div className="table table-responsive">
              <table
                className="voucher_table mb-0 table table-hover table"
                style={{ cursor: "pointer" }}
              >
                <thead>
                  <tr>
                    <th className="text-nowrap ledger-table-header  dealer-ledger-td-l">
                      Date
                    </th>
                    <th className="text-nowrap ledger-table-header">
                      Particulars
                    </th>
                    <th className="text-nowrap ledger-table-header">
                      Vch Type
                    </th>
                    <th className="text-right text-nowrap ledger-table-header">
                      Vch No.
                    </th>
                    <th className="text-right text-nowrap ledger-table-header">
                      Debit
                    </th>
                    <th className="text-right text-nowrap ledger-table-header dealer-ledger-td-r">
                      Credit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-right bold">
                      Opening Balance
                    </td>

                    <td className="text-right bold">
                      ₹{dealerledger?.item?.general_data?.debit_opening_balance}
                    </td>
                    <td className="text-right bold dealer-ledger-td-r">
                      ₹
                      {dealerledger?.item?.general_data?.credit_opening_balance}
                    </td>
                  </tr>

                  {dealerledger?.data?.sales_data?.map(
                    (salesVoucher: any, index: number) => {
                      return (
                        <>
                          <tr
                            key={index}
                            onClick={() => {
                              HandleLedgerPdf(salesVoucher.pdf_link);
                            }}
                          >
                            <td className="text-nowrap dealer-ledger-td-l">
                              {salesVoucher.posting_date}
                            </td>
                            <td>{salesVoucher.party_name}</td>
                            <td className="text-nowrap">
                              {salesVoucher.voucher_type}
                            </td>
                            <td className="text-right text-nowrap">
                              {salesVoucher.Voucher_number}
                            </td>
                            <td className="text-right text-nowrap">
                              ₹{salesVoucher.debit_amount}
                            </td>
                            <td className="text-right text-nowrap dealer-ledger-td-r">
                              {salesVoucher.credit_amount}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-right bold">
                      Current Total
                    </td>
                    <td className="text-right bold">
                      ₹{dealerledger?.data?.general_data?.current_total}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-right bold">
                      Closing Balance
                    </td>
                    <td className="text-right bold">
                      ₹{dealerledger?.data?.general_data?.debit_closing_balance}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </tbody>
        </table>
      </div>
    </>
    //   ) : (
    //     "no daata"
    //   )}
    // </>
  );
};

export default DealerLedgerTable;
